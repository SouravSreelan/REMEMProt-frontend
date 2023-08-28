"use client"
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ResultItem {
  gene: string;
  Transmem_status: string;
  profileOrDifferenial: string;
  contextOfIdent: string;
  pmid: string;
  cellMarker: {
    tissueType: string;
    cancerType: string;
    cellName: string;
  }[];
}

interface ResponseData {
  results: ResultItem[];
}

const BqueryResult = () => {
  const searParams = useSearchParams();
  const species = searParams.get('species');
  const bqueryInput = searParams.get('bqueryInput');
  const csrfToken = getCookie('csrftoken');
  const [data, setData] = useState<ResultItem[] | undefined>();

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
          const responseData: ResponseData = await response.json();
          setData(responseData.results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))}
    </div>
  );
};

export default BqueryResult;
