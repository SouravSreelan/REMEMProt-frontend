"use client"
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ResultItem {
  id: string;
  pmid: string;
  author: string;
  paper: string;
  organism: string;
  CellOrtissue: string;
  disease: string;
  profileOrDifex: string;
  contxtOfIdent: string;
  contxtOfDiferentialREG: string;
  test: string;
  control: string;
  foldchange: string;
  expression: string;
  protienExtractMethod: string;
  geneSymbol: string;
  geneID: string;
  isTrans: string;
}

const BqueryResult = () => {
  const searParams = useSearchParams();
  const species = searParams.get('species');
  const bqueryInput = searParams.get('bqueryInput');
  const csrfToken = getCookie('csrftoken');
  const [data, setData] = useState<ResultItem[] | undefined>();



  useEffect(() => {
    const getData = async () => {
      if (species && bqueryInput) {
        const postData = new URLSearchParams();
        postData.append('species', species);
        postData.append('bqueryInput', bqueryInput);

        try {
          if (csrfToken) {
            const response = await fetch('http://localhost:8000/RememProt/bqueryResult/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
              },
              body: postData.toString(),
              credentials: 'include',
            });
            const responseData = await response.json();
            setData(responseData.results);
            console.log({ responseData });
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    getData();
  }, [species, bqueryInput]);

  return (
    <div>
      {data &&
        data.map((item, index) => (
          <div key={index}>

            {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
            <pre>{item.contxtOfIdent}</pre>
          </div>
        ))}
    </div>
  );
};

export default BqueryResult;
