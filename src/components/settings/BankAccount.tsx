import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';
import useFormValidation from '../../hooks/useFormValidation';
import { BankAccountSchema } from '../../validation/sellerProfileSchema';
import ErrorMessage from '../common/ErrorMessage';
import { getBankList } from '../../services/getBankList';
import { addBankDetails } from '../../services/profileService';

export default function BankAccount() {
  const [bankList, setBankList] = useState<
    { id: string | number; name: string }[]
  >([]);
  const { register, errors, handleSubmit } = useFormValidation(
    BankAccountSchema(bankList)
  );

  function handleFormSubmit(data: any) {
    console.log(data);
    // addBankDetails(data).then(console.log).catch(console.log);
  }

  useEffect(() => {
    getBankList()
      .then((res) => setBankList(res))
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
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
