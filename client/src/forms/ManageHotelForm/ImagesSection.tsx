import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const ImagesSection = () => {
    const { register, formState : {errors}} = useFormContext<HotelFormData>();
    return (
        <div>
            <h4 className="text-2xl font-bold mb-3">Images</h4>
            <div className="border rounded flex flex-colgap-4 p-4">
                <input type="file" 
                multiple 
                accept="image/*"
                className="w-full text-gray-700 font-normal"
                {...register("imageUrls", {
                    validate: (imageUrls) => {
                        const totalLength = imageUrls.length;
                        if(totalLength === 0){
                            return "Add at least one image";
                        }
                        else if (totalLength > 6){
                            return "You can add more than 6 images";
                        }
                        return true;
                    }
                })}/>
            </div>
            {errors.imageUrls && 
            <span className="font-semibold text-sm text-red-500"> {errors.imageUrls.message} </span>}
        </div>
    )
}

export default ImagesSection;