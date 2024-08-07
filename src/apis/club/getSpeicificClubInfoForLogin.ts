import { useQuery } from '@tanstack/react-query';
import { instance } from '@apis/instance';

export interface clubInfoProps {
  id: string;
  clubName: string;
  address: string;
  ratingSum: number;
  ratingCount: number;
  avgRating: number;
  price: number;
  phoneNumber: string;
  snsLink: string;
  businessHours: string;
  latitude: number;
  isHeart: boolean;
  longitude: number;
  category: string;
  type: 'GAME' | 'TIME';
  imageUrls: string[];
  presignedImageUrls: string[];
  amenities: string[];
}

interface SpecificClubInfoResponse {
  result: clubInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getSpecificClubInfoForLogin = async (
  clubId: string
): Promise<SpecificClubInfoResponse> => {
  return instance.get(`/api/v1/club/user/${clubId}`);
};

export const useGetSpecificClubInfoForLogin = (clubId: string) => {
  return useQuery({
    queryKey: ['specificClubInfoForLogin', clubId],
    queryFn: () => getSpecificClubInfoForLogin(clubId),
    refetchOnMount: 'always',
  });
};
