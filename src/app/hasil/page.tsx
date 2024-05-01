'use client'

import React, { useEffect, useContext, createContext } from 'react'
import PercentageCircle from "@/components/PercentageCirlce"
import { useRouter } from 'next/navigation';
import { ResProvider, useResContext } from "@/context/resContext";


function Hasil() {
  // const hasil = useContext(hasilContext);
  const router = useRouter();
  const [tab, settab] = React.useState('hasil');

  const {value, setValue} = useResContext();


  // useEffect(() => {
  //   // console.log(hasil);
  //   console.log(value);
  // }, [])

  const tabRender = (a:String) => {
    if(tab == "rincian"){

    return (
      <table className='w-[80%]'>
      <tbody>
      <tr>
        <td className='font-semibold'>Nama</td>
        <td>Text.txt</td>
      </tr>
      <tr>
        <td className='font-semibold'>Ukuran</td>
        <td>140kb</td>
      </tr>
      <tr>
        <td className='font-semibold'>Format</td>
        <td>txt</td>
      </tr>
      <tr>
        <td className='font-semibold'>Jumlah Kata</td>
        <td>500 kata</td>
      </tr>
      </tbody>
    </table>
    )
  } else if(tab == "hasil"){
    return (
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa obcaecati necessitatibus, animi quasi enim exercitationem rerum delectus, nulla minus possimus quis molestias laudantium quibusdam ab adipisci nihil sed odit ipsum distinctio esse aperiam placeat deserunt voluptas quam? Eveniet magnam minima, illum quos, quaerat alias ipsum tempore aut vero eius aliquid.</p>
    )
  } else if(tab == "hash"){
    return (
      <p>{`{1827061} {1576921} {1724281} 
      {1573699} {1688859} {1828254} 
      {1864126} {1662530} {1699686}
       {1786288} {1772611} {1576921} 
      {1688859} {1828254} {1590026} 
      {1864126} {1662530} {1699686} 
       {1772611} {1783208} {1724281}
       {1573699} {1688859} {1828254}
       {1868443} {1662530} {1699686}
       {1786288} {1772611} {1783208} `}</p>
    )
  }
  }
  
  const [level, setlevel] = React.useState('orisinil');
  const [style, setstyle] = React.useState('orisinil');


  useEffect(()=>{
    function colorit(value:number){
      value = 70;
      if(value < 20){
        setlevel('Orisinil');
        setstyle('block text-green-400')
      } else if (value < 70) {
        setlevel('Plagiat Sedang');
        setstyle('block text-yellow-600')
      } else {
        setlevel('Plagiat Berat');
        setstyle('block text-red-500')
      }
    }
  }, [])

  return (
    <div className='max-w-screen-xl mx-auto'>
    <div className='px-5 py-5'>
        <div className='p-5 flex flex-col md:flex-row justify-center items-center  rounded-lg bg-medb w-full h-[250px] mb-5 md:max-w-screen-md md:mx-auto'>
            <div className='mb-2 md:mr-5'>
              <PercentageCircle value={70} />
            </div>
            <div className='text-center md:text-left text-white font-semibold'>Dokumen anda terdeteksi {value[1].kesamaan}<span className={style}>{level}</span>
              <button onClick={() => router.push("/")} className='bg-white text-darkb mt-2 block'>Bandingkan Lagi</button>
            </div>
        </div>
        <div className='tab rounded-t-lg w-full h-[50px] border flex'>
            <div onClick={()=>settab('hasil')}>Perbandingan</div>
            <div onClick={()=>settab('rincian')}>File</div>
            <div onClick={()=>settab('hash')}>Hash</div>
        </div>
        <div className='md:flex text-cmp rounded-b-lg w-full border'>
          <div><span className='font-bold block my-2'>Nama File 1</span>
            {tabRender('dokumen 1')}
          </div>
          <div><span className='font-bold block my-2'>Nama File 2</span>
          {tabRender('dokumen 2')}
          </div>        
        </div>
    </div>

    </div>
  )
}

export default Hasil