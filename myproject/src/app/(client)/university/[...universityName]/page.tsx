'use client';
import DynamicUniversityCardinfo from '@/components/DynamicUniversityCardinfo';
import fetch_University_Data_ByName from '@/utils/FetchUniversity';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { UniversityInfoType } from '../../../../../ModelTypes/ModelTypes';

export default function Page({ params }: { params: { universityName: string } }) {
  const { universityName } = params;
  const decodedUniversityName = decodeURIComponent(universityName);

  const [loading, setLoading] = useState(false);
  const [universityData, setUniversityData] = useState<UniversityInfoType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const response = await axios.post("/api/get-universityInfoByName",{universityName:decodedUniversityName});
        setUniversityData(response.data.universityData);

      }
       catch (error:any) {
        console.error('Error fetching university data:', error.response.data.message);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedUniversityName]);

  return (
    <div className="pt-[85px] min-h-[100vh]">
      {loading ? (
        <div className="flex items-center min-h-[100vh] justify-center">
          <Loader2 height={50} width={50} className="mr-2 animate-spin" />
        </div>
      ) : universityData && universityData.length > 0 ? (
        universityData.map((university: UniversityInfoType, index: number) => (
          <DynamicUniversityCardinfo
            key={index}
            universityImage={university.cloudinaryImageUrl}
            universityName={university.universityName}
            aboutUniversity={university.aboutUniversity}
            cutoffs={university.cutoffs}
          />
        ))
      ) : (
        <div>No university data found.</div>
      )}
    </div>
  );
}
