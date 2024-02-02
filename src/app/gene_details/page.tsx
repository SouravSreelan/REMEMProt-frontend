import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '@/components/ui/Spinner';

const GeneDetailsPage = () => {
  const router = useRouter();
  const { geneSymbol } = router.query;
  const [geneDetails, setGeneDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeneDetails = async () => {
      try {
        // Fetch gene details using the geneSymbol from the query parameters
        const response = await fetch(`${url}/getGeneDetails?geneSymbol=${geneSymbol}`);
        
        if (response.ok) {
          const data = await response.json();
          setGeneDetails(data);
        } else {
          console.error('Error:', response.statusText);
          console.error('Non-JSON response:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (geneSymbol) {
      fetchGeneDetails();
    }
  }, [geneSymbol]);

  return (
    <div className="max-w-8xl mx-auto px-6 md:px-3 xl:px-6">
      {loading && <Spinner />}

      {geneDetails && (
        <div>
          <h1>{geneDetails.geneSymbol}</h1>
        </div>
      )}

      {!loading && !geneDetails && (
        <div>
          <p>No gene details found for {geneSymbol}.</p>
        </div>
      )}
    </div>
  );
};

export default GeneDetailsPage;
