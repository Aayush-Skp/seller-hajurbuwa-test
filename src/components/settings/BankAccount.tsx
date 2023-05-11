import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';
import { addBankDetails, getBankList } from '../../services/profileService';
import { useRouter } from 'next/router';
import Spinner from '../loader/Spinner';
import ErrorMessage from '../common/ErrorMessage';

export default function BankAccount() {
  const [bankList, setBankList] = useState<
    { id: string | number; name: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedBank, setSelectedBank] = useState('');

  const [accName, setAccName] = useState('');

  const [accNo, setAccNo] = useState('');

  const [bankValidation, setBankValidation] = useState({
    isValid: true,
    message: '',
  });

  const [accountNameValidation, setAccountNameValidation] = useState({
    isValid: true,
    message: '',
  });

  const [accountNoValidation, setAccountNoValidation] = useState({
    isValid: true,
    message: '',
  });

  const router = useRouter();

  function handleBankSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedBank(e.target.value);
    setBankValidation({
      isValid: true,
      message: '',
    });
  }

  function handleAccNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccName(e.target.value);
    setAccountNameValidation({
      isValid: true,
      message: '',
    });
  }

  function handleAccNoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccNo(e.target.value);
    setAccountNoValidation({
      isValid: true,
      message: '',
    });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedBank === '') {
      setBankValidation({
        isValid: false,
        message: 'Please select a bank',
      });

      return;
    }

    if (accName === '') {
      setAccountNameValidation({
        isValid: false,
        message: 'Please enter account name',
      });

      return;
    }

    if (accNo === '') {
      setAccountNoValidation({
        isValid: false,
        message: 'Please enter account no.',
      });

      return;
    }

    setIsLoading(true);

    addBankDetails({
      account_name: accName,
      account_number: accNo,
      bank_id: selectedBank,
    })
      .then(() => {
        const value = localStorage.getItem('userDetails');

        if (typeof value === 'string') {
          let updatedValue = JSON.parse(value);

          localStorage.setItem(
            'userDetails',
            JSON.stringify({
              ...updatedValue,
              account_name: accName,
              account_number: accNo,
              bank_id: selectedBank,
            })
          );
        }
      })
      .then(() => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const value = localStorage.getItem('userDetails');

    getBankList()
      .then((res) => setBankList(res))
      .then(() => {
        if (typeof value === 'string') {
          const sellerDetails = JSON.parse(value);
          setAccName(sellerDetails?.account_name);
          setAccNo(sellerDetails?.account_number);
          setSelectedBank(`${sellerDetails?.bank_id}`);
        }
      })
      .catch(console.log);
  }, []);

  return (
    <section>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-5">
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Account Name" />
          </div>
          <div className="w-80">
            <TextInput onChange={handleAccNameChange} value={accName} />
            <ErrorMessage message={accountNameValidation?.message} />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Account Number" />
          </div>
          <div className="w-80">
            <TextInput onChange={handleAccNoChange} value={accNo} />
            <ErrorMessage message={accountNoValidation?.message} />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Bank Name" />
          </div>
          <div className="w-80">
            <select
              onChange={handleBankSelection}
              className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none"
            >
              <option value="">Select a bank</option>
              {bankList.map((bank) => (
                <option
                  key={bank.id}
                  value={`${bank.id}`}
                  selected={`${bank.id}` === selectedBank}
                >
                  {bank.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={bankValidation?.message} />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-36">
            <Button type="submit">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span>Please wait...</span>
                  <Spinner />
                </div>
              ) : accName !== '' ? (
                'Update'
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
