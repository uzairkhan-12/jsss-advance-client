/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { IoMdPersonAdd } from 'react-icons/io';
import ModalLayout from '@/components/modals/modalLayout';
import { useState } from 'react';
import Input from '@/components/ui/InputWithValidation';
import Button from '@/components/ui/button';
const ReferralCard = () => {
  const partners = [
    {
      name: 'Marie Joe',
      imageUrl:
        'https://res.cloudinary.com/instagramcloude/image/upload/v1658385673/oonmsmcrgz34d4txfxzk.png',
      desc: '20% off on this other page',
    },
    {
      name: 'Marta Dolores',
      imageUrl:
        'https://res.cloudinary.com/instagramcloude/image/upload/v1658385673/oonmsmcrgz34d4txfxzk.png',
      desc: '35.9% off on this other page',
    },
  ];

  const [openAddPartner, setOpenAddPartner] = useState<boolean>(false);

  return (
    <>
      <ModalLayout open={openAddPartner} setOpen={setOpenAddPartner}>
        <div>
          <h1 className="text-xl text-center mb-5">
            Please enter your partner referal ID
          </h1>
          <div className="flex flex-col items-center gap-3">
            <Input
              name="referalid"
              placeholder="referalid"
              required={true}
              type="text"
            />
            <Button
              buttonStyles="bg-primary-dark text-sm text-white hover:bg-stone-950 px-5 py-1.5"
              icon={<IoMdPersonAdd />}
              onClick={() => setOpenAddPartner(!openAddPartner)}
              title="Link"
              type={'button'}
            />
          </div>
        </div>
      </ModalLayout>
      <div className=" w-full bg-white rounded-lg  shadow-md ">
        <div className="flex border-b border-gray-300 items-center justify-center">
          <h5 className=" px-6 py-3 text-lg font-medium leading-tight dark:border-neutral-600">
            Referral List
          </h5>
        </div>
        <div className="p-6">
          <Button
            buttonStyles="bg-primary-dark text-white hover:bg-stone-950 px-3 py-2"
            icon={<IoMdPersonAdd />}
            onClick={() => setOpenAddPartner(!openAddPartner)}
            title="Link a volt partner"
            type={'button'}
          />
        </div>
        {partners.length > 0 &&
          partners.map((partner: any, index: number) => {
            return (
              <div className="mb-12 px-6 flex md:mb-0" key={index}>
                <div className="basis-auto">
                  <Image
                    alt="Avatar"
                    className="mb-6 w-16 rounded-lg shadow-lg dark:shadow-black/20"
                    height={50}
                    src={partner.imageUrl}
                    width={50}
                  />
                </div>

                <div className="w-10/12 basis-auto pl-6">
                  <p className="mb-3 font-semibold">{partner.name}</p>
                  <p>{partner.desc}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ReferralCard;
