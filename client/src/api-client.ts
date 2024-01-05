//fetch requests. separate file to keep code cleaner
import { RegisterFormData } from './pages/Register'
export const register = async (formData : RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json()
// responseBody will contain only errors, if there are any.
    if(!response.ok){
        throw new Error(responseBody.message)
    }
} 