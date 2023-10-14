'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function EditMhs(mahasiswa) {
    const [nim,setNim] = useState(mahasiswa.nim)
    const [nama,setNama] = useState(mahasiswa.nama)
    const [modal,setModal] = useState(false)
    const [isMutating,setIsMutating] = useState(false)
    function handleChange (){
        setModal(!modal)
    }
    const router = useRouter()
    async function handleEdit(e){
        console.log(nim,nama);
        e.preventDefault()
        setIsMutating(true)
        await fetch(`https://backend2-zvv4kgaupa-et.a.run.app/${mahasiswa.id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nim:Number(nim),
                nama:nama
            })
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
        <button className="btn btn-info btn-sm mr-3" onClick={handleChange}>Edit</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Data</h3>
            <form onSubmit={handleEdit}>
                <div className="form-control">
                    <label className="label font-bold">NIM</label>
                    <input type="text" className="input w-full input-bordered" 
                    value={nim} onChange={(e)=> setNim(e.target.value)} placeholder="NIM"/>
                </div><div className="form-control">
                    <label className="label font-bold">Nama</label>
                    <input type="text" className="input w-full input-bordered"
                    value={nama} onChange={(e)=> setNama(e.target.value)}  placeholder="nama mahasiswa"/>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {
                      !isMutating
                      ?
                      <button type="submit" className="btn btn-primary">Update</button>
                      :
                      <button type="button" className="btn loading">Updating.....</button>
                    }
                    
                    
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}
