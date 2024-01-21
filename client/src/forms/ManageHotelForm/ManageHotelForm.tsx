import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestCount from "./GuestCountSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name : string,
    city : string,
    country : string,
    description : string,
    adultCount : number,
    childCount : number,
    imageUrls : FileList,
    type : string,
    facilities : string[],
    pricePerNight : number,
    starRating : number
};

type Props = {
  onSave : (hotelFormData : FormData) => void,
  isLoading : boolean
}

const ManageHotelForm = ({onSave, isLoading} : Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } =  formMethods;

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
      const formData = new FormData();

      formData.append("name", formDataJson.name);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
      formData.append("description", formDataJson.description);
      formData.append("type", formDataJson.type);
      formData.append("pricePerNight", formDataJson.pricePerNight.toString());
      formData.append("starRating", formDataJson.starRating.toString());
      formData.append("adultCount", formDataJson.adultCount.toString());
      formData.append("childCount", formDataJson.childCount.toString());
  
      formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });

  
      Array.from(formDataJson.imageUrls).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile);
      });
      console.log(formData);
      onSave(formData);
    });


  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <DetailsSection/>  
        <TypeSection/>   
        <FacilitiesSection/>
        <GuestCount/> 
        <ImagesSection/>

        <span className="flex justify-end">
          <button disabled={isLoading} className="bg-blue-600 py-2 px-4 text-white text-bold hover:bg-blue-500 rounded text-xl disabled:bg-gray-500" type="submit">
            {isLoading? "Saving...":"Save"}
          </button>
        </span>
      </form>
    </FormProvider>

  )
}

export default ManageHotelForm
