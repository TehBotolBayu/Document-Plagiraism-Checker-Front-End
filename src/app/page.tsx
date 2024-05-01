'use client'

import { useEffect, useState, createContext } from "react";
import Image from "next/image";
import Link from "next/link";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRouter, useSearchParams } from 'next/navigation';
import Hasil from "@/components/Hasil";

import { ResProvider, useResContext } from "@/context/resContext";

// const hasilContext = createContext()

export default function Home() {
  const [file, setFile] = useState<any>(null);
  const [files, setFiles] = useState<any>(null);
  const [load, isLoad] = useState<boolean>(false);

  const router = useRouter();

  let {value, setValue}= useResContext();

  // useEffect(() => {
  //   router.push('/hasil');
  // }, [hasil])

  // const [sizea, setsizea] = useState(0);
  // const [sizeb, setsizeb] = useState(0);

  const handleChange = (e:any) => {
    let rawSize = e.target.files[0].size / 1024;
    // console.log(rawSize);
    let sizea = parseInt(rawSize.toFixed(1));
    let filenamea = e.target.files[0].name;
    // console.log(sizea);
    let x = value; x[0] = {sizea, filenamea}
    setValue(x);
    setFile(e.target.files[0]);
  };

  const handleChanges = (e:any) => {
    let rawSize = e.target.files[0].size / 1024;
    // console.log(rawSize);
    let sizeb = parseInt(rawSize.toFixed(1));
    let filenameb = e.target.files[0].name;
    // console.log(sizeb)
    let x = value; x[1] = {sizeb, filenameb}
    setValue(x);
    setFiles(e.target.files[0]);
  };

  useEffect(() => {
    // for (let v in value)
    console.log(value);
  }, [value])

  const [mode, setMode] = useState("home");

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('files', files);
      isLoad(true);
      const response = await fetch('https://16.78.32.38:8090/', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        isLoad(false);
        throw new Error('Error uploading file');
      }
      // const responseData = await response.json();
      response.json().then((responseData:any) => {       
        console.log('File uploaded successfully:', responseData);
        isLoad(false);
        setValue(value.concat(responseData));
        setMode("hasil");
      })
    } catch (err) {
      if(err instanceof Error)
      console.error('Error uploading file:', err.message);
      isLoad(false)
    }
  };

  // useEffect(()=> {
  //   setValue(['w', 'd']);
  //   // console.log(value)
  // }, [])

  // useEffect(()=> {
  //   // setValue(['w', 'd']);
  //   console.log(value)
  // }, [value])

  const renderSwitch = () => {
    if(mode == "home"){
      return (
        <>
        {
          (load) ?
          <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          >
            <CircularProgress size={100} />
            <h1>Sedang Memproses</h1>
          </Box>:
          <>
          <div className="px-5 flex flex-col justify-center items-center">
            <h1 className="my-14 text-center font-bold text-xl">Perbandingan Dua Data Teks Menggunakan Algoritma Rabin Karp dan Rolling Hash. Upload dokumen dalam format pdf</h1>
            {/* <button onClick={() => {setValue(value+1)}}>click me</button> */}
            {/* <p>{value}</p> */}
            <div className="md:flex">
              <div className="rounded-lg bg-gray-300 h-[500px] w-[80vw]
              md:w-[400px] md:mx-14 flex justify-center items-center mb-10 md:mb-0">
                <label className="button inline-block cursor-pointer ">
                  <input type="file" onChange={handleChanges} className="hidden" placeholder="ad"/>
                  {(!value[1])?"Upload Dokumen Anda": value[1].filenameb}
                </label>
              </div>
              <div className="rounded-lg bg-gray-300 h-[500px] w-[80vw]
              md:w-[400px] md:mx-14 flex justify-center items-center">
                <label className="button inline-block cursor-pointer ">
                  <input type="file" onChange={handleChange} className="hidden" placeholder="ad"/>
                  {(!value[0])?"Upload Dokumen Pembanding": value[0].filenamea}
                </label>
              </div>
            </div>
            <button onClick={uploadFile} className="my-14">Bandingkan</button>
          </div>
          </>
        }
        </>
      )
    } else {
      return <Hasil ren={setMode}/>
    }
  }
  
  return (
    <>
{
  renderSwitch()
}
</>
  );
}
