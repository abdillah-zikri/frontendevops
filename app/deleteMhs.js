'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function DeleteMhs(mahasiswa) {
    console.log(mahasiswa.id);
    const [modal,setModal] = useState(false)
    const [isMutating,setIsMutating] = useState(false)
    function handleChange (){
        setModal(!modal)
    }
    const router = useRouter()
    async function handleDelete(productId){
        setIsMutating(true)
        await fetch(`https://backend2-zvv4kgaupa-et.a.run.app/${productId}`,{
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Response data:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });

        setIsMutating(false)
        router.refresh()
        setModal(false)
    }
  return (
    <div>
        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {
                      !isMutating
                      ?
                      <button type="button" onClick={()=>handleDelete(mahasiswa.id)} className="btn btn-primary">Delete</button>
                      :
                      <button type="button" className="btn loading">Deleting.....</button>
                    }
                    
                    
                </div>
            </div>
        </div>
    </div>
  )
}
