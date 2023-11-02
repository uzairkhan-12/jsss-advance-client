/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  deleteSingleUser,
  fetchUsersDetails,
} from '@/redux/features/admin/users-details-slice';
import { useAppSelector } from '@/redux/store';
import { TrashIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function ManageUsers() {
  const dispatch = useDispatch();
  const usersData = useAppSelector(
    state => state.adminUsersDetailsReducer.data,
  );

  function renderAccounts() {
    if (usersData && usersData.length > 0) {
      return usersData.map((user: any) => (
        <div
          className="flex justify-between items-center border border-gray-200 w-full rounded-lg p-3"
          key={user._id}
        >
          <div className="flex justify-start items-center gap-3">
            <Image
              alt="Profile loading..."
              className="rounded-full border border-gray-200"
              height="40"
              src={
                'https://media.istockphoto.com/id/519078723/photo/male-silhouette-as-avatar-profile-picture.jpg?s=612x612&w=0&k=20&c=USSwffkuSQY7gfsbmQ_Sntkpcf4__ie4d068Gug97AQ='
              }
              width="40"
            />
            <div>
              <h1 className="font-semibold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>
          <button onClick={() => dispatch(deleteSingleUser(user._id))}>
            <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-500 transition-all" />
          </button>
        </div>
      ));
    }
    return null;
  }

  useEffect(() => {
    dispatch(fetchUsersDetails());
  }, [dispatch]);
  return (
    <div className="col-span-1 border border-gray-200 rounded-lg p-5 h-[27rem] overflow-auto custom-scrollbar">
      <h1 className="text-lg font-semibold text-gray-900 mb-3">Manage Users</h1>
      <div className="flex flex-col gap-5">{renderAccounts()}</div>
    </div>
  );
}
