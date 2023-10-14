import AddMhs from "./addMhs";
import DeleteMhs from "./deleteMhs";
import EditMhs from "./editMhs";

async function getData() {
  const res = await fetch("https://backend2-zvv4kgaupa-et.a.run.app/", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const mahasiswa = await getData();
  console.log(mahasiswa);
  return (
    <div>
      <AddMhs/>
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((val, ind) => (
            <tr key={val.id}>
              <td>{ind+1}</td>
              <td>{val.nim}</td>
              <td>{val.nama}</td>
              <td className="flex">
                <EditMhs {...val}/>
                <DeleteMhs {...val}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
