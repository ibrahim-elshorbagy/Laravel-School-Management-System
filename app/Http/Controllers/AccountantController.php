<?php

namespace App\Http\Controllers;

use App\Models\Accountant;
use App\Http\Requests\StoreAccountantRequest;
use App\Http\Requests\UpdateAccountantRequest;
use App\Http\Resources\AccountantResource;
use App\Models\Level;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AccountantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Accountant::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");


        if (request("name")) {
        $query->whereHas('user', function ($q) {
            $q->where("name", "like", "%" . request("name") . "%");
        });
        }
        if (request("email")) {
            $query->whereHas('user', function ($q) {
                $q->where("email", "like", "%" . request("email") . "%");
            });
        }

        $accountants = $query->with(['user','level'=>function($q){$q->select('id','name');}])->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("Accountant/Index", [
            "accountants" => AccountantResource::collection($accountants),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);

        return inertia("Accountant/Create", [
            'levels'=>$levels
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountantRequest $request)
    {

        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'accountant',

        ]);

        unset($data['name']);
        unset($data['password']);
        unset($data['email']);
        $data['user_id'] = $user->id;

        Accountant::create($data);

        return to_route('accountant.index')
            ->with('success', 'Accountant Added Successfully ');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Accountant $accountant)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);

        return inertia('Accountant/Edit',[
            'levels' => $levels,
            'accountant'=>$accountant->load(['user','level'=>function($q){$q->select('id','name');}])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountantRequest $request, Accountant $accountant)
    {
        $data = $request->validated();

        $user = $accountant->user;

        $userUpdateData = [
        'name' => $data['name'],
        'email' => $data['email'],
        'role' => 'accountant',
        ];

        if (!empty($data['password'])) {
            $userUpdateData['password'] = Hash::make($data['password']);
        }

        $user->update($userUpdateData);

        unset($data['name']);
        unset($data['email']);
        unset($data['password']);

        $data['user_id'] = $user->id;

        $accountant->update($data);

        return redirect()->route('accountant.index')
            ->with('success', 'Accountant successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accountant $accountant)
    {
        $accountant->user->delete();
        return to_route('accountant.index')->with('success','Accountant deleted successfully');
    }
}
