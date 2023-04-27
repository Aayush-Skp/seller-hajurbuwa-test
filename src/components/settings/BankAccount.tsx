import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';
import useFormValidation from '../../hooks/useFormValidation';
import { BankAccountSchema } from '../../validation/sellerProfileSchema';
import ErrorMessage from '../common/ErrorMessage';
import { getBankList } from '../../services/getBankList';
import { addBankDetails } from '../../services/profileService';
import { useRouter } from 'next/router';

export default function BankAccount() {
  const [bankList, setBankList] = useState<
    { id: string | number; name: string }[]
  >([]);

  const [apiResponse, setApiResponse] = useState({
    isLoading: false,
    isError: false,
    message: '',
  });

  const { register, errors, handleSubmit, setValue, getValues } =
    useFormValidation(BankAccountSchema(bankList));

  const router = useRouter();

  function handleFormSubmit(data: any) {
    addBankDetails(data)
      .then(() => {
        const value = localStorage.getItem('userDetails');

        if (typeof value === 'string') {
          let updatedValue = JSON.parse(value);

          localStorage.setItem(
            'userDetails',
            JSON.stringify({
              ...updatedValue,
              account_name: getValues('account_name'),
              account_number: getValues('account_number'),
              bank_id: getValues('bank_id'),
            })
          );
        }
      })
      .then(() => {
        router.reload();
      })
      .catch(console.log);
  }

  useEffect(() => {
    const value = localStorage.getItem('userDetails');

    getBankList()
      .then((res) => setBankList(res))
      .then(() => {
        if (typeof value === 'string') {
          const sellerDetails = JSON.parse(value);
          setValue('account_name', sellerDetails?.account_name);
          setValue('account_number', sellerDetails?.account_number);
          setValue('bank_id', sellerDetails?.bank_id.toString());
        }
      })
      .catch(console.log);
  }, []);

  return (
    <section>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-5"
      >
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Account Name" />
          </div>
          <div className="w-80">
            <TextInput {...register('account_name')} />
            <ErrorMessage message={errors?.account_name?.message as string} />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Account Number" />
          </div>
          <div className="w-80">
            <TextInput {...register('account_number')} />
            <ErrorMessage message={errors?.account_number?.message as string} />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Bank Name" />
          </div>
          <div className="w-80">
            <select
              {...register('bank_id')}
              className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none"
            >
              <option value="">select a bank</option>
              {bankList.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors?.bank_id?.message as string} />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-36">
            <Button type="submit">
              {getValues('account_name') !== '' ? 'Update' : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
