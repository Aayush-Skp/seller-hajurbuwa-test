import axios from 'axios';
import React from 'react';

export default function Test() {
  async function test() {
    axios
      .get('https://dashboard.hajurbuwa.com/api/get-csrf-token')
      .then((res) => {
        console.log(res.data.data);
        axios
          .post(
            'https://dashboard.hajurbuwa.com/api/check-number',
            {
              phone: 9860119162,
            },
            {
              headers: {
                'X-CSRF-TOKEN': res.data.data,
              },
            }
          )
          .then(console.log)
          .catch(console.log);
      });
  }

  test();
  return (
    <>
      <input
        type="checkbox"
        className="peer w-28 h-8 cursor-pointer appearance-none"
        onChange={(e) => console.log(e.target.files)}
      />
      <div className="hidden peer-checked:block text-black">
        I&apos;m visible
      </div>
    </>
  );
}
