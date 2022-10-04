import { create } from 'axios';
const instance = create({
  baseURL: 'https://62a6bb9697b6156bff7e6251.mockapi.io/v1'
})
const objectToText = (object) => Object.entries(object)
  .map(([k, v]) => v !== undefined ? `${k}=${v}` : null)
  .filter(c => c)
  .join('&')
const useApi = () => {
  return {
    async getRequest (resource, query = {}, options = {}) {
      try {
        const response = await instance.get(`/${resource}${query ? `?${objectToText(query)}` : ''}`, options)
        return response;
      } catch (error) {
        console.error('Error while performing GET request', error)
        return null;
      }
    },
    async putRequest (resource, data) {
      try {
        const response = await instance.put(`/${resource}`, data);
        return response;
      } catch (error) {
        console.error('Error while updating a resource', error);
        return null;
      }
    },
    async deleteRequest (id) {
      try {
        const response = await instance.delete(`/apis/${id}`);
        return response;
      } catch (error) {
        console.error('Error while updating a resource', error);
        return null;
      }
    }
  }
}
export default useApi;
