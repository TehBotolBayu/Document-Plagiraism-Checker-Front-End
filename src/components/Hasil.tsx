'use client'

import React, { useEffect, useContext, createContext } from 'react'
import PercentageCircle from "@/components/PercentageCirlce"
import { useRouter } from 'next/navigation';
import { ResProvider, useResContext } from "@/context/resContext";


function Hasil({ren}) {
  // const hasil = useContext(hasilContext);
  const router = useRouter();
  const [tab, settab] = React.useState('hasil');

  const {value, setValue} = useResContext();


  // useEffect(() => {
  //   // console.log(hasil);
  //   console.log(value);
  // }, [])

  const tabRender = (dokumen:String) => {
    if(tab == "rincian"){

    return (
      <table className='w-[80%]'>
      <tbody>
      <tr>
        <td className='font-semibold'>Nama</td>
        <td>{
          (dokumen == "dokumen 1")?
          value[0].filenamea:value[1].filenameb
      }</td>
      </tr>
      <tr>
        <td className='font-semibold'>Ukuran</td>
        <td>{
          (dokumen == "dokumen 1")?
          value[0].sizea:value[1].sizeb
      } kb</td>
      </tr>
      <tr>
        <td className='font-semibold'>Format</td>
        <td>
        {
          (dokumen == "dokumen 1")?
          value[0].filenamea.slice((value[0].filenamea.lastIndexOf(".") - 1 >>> 0) + 2):
          value[1].filenameb.slice((value[1].filenameb.lastIndexOf(".") - 1 >>> 0) + 2)
      }
        </td>
      </tr>
      {/* <tr>
        <td className='font-semibold'>Jumlah Kata</td>
        <td>500 kata</td>
      </tr> */}
      </tbody>
    </table>
    )
  } else if(tab == "hasil"){
    return (
      <p className='h-[500px] overflow-scroll whitespace-wrap overflow-ellipsis'>
        {
        (dokumen == "dokumen 1")?
        value[7].preprocessing1:value[8].preprocessing2
    }
      </p>
    )
  } else if(tab == "hash"){
    return (
      <p className='h-[500px] overflow-scroll overflow-ellipsis'>{
        (dokumen == "dokumen 1")?
        value[3].hash1:value[4].hash2
    }</p>
    )
  }
  }
  
  const [level, setlevel] = React.useState('Orisinil');
  const [style, setstyle] = React.useState('block white');


  useEffect(()=>{
    function colorit(){
      let score = parseFloat(parseFloat(value[2].kesamaan).toFixed(2));
      if(score < 20.0){
        setlevel('Orisinil');
        setstyle('block text-green-400')
      } else if (score < 70.0) {
        setlevel('Plagiat Sedang');
        setstyle('block text-yellow-600')
      } else {
        setlevel('Plagiat Berat');
        setstyle('block text-red-500')
      }
    }
    colorit();
  }, [])

  return (
    <div className='max-w-screen-xl mx-auto'>
    <div className='px-5 py-5'>
        <div className='p-5 flex flex-col md:flex-row justify-center items-center  rounded-lg bg-medb w-full h-[250px] mb-5 md:max-w-screen-md md:mx-auto'>
            <div className='mb-2 md:mr-5'>
              <PercentageCircle value={parseFloat(parseFloat(value[2].kesamaan).toFixed(2))} />
            </div>
            <div className='text-center md:text-left text-white font-semibold'>Dokumen anda terdeteksi {value[1].kesamaan}<span className={style}>{level}</span>
              <button onClick={() => ren("home")} className='bg-white text-darkb mt-2 block'>Bandingkan Lagi</button>
            </div>
        </div>
        <div className='tab rounded-t-lg w-full h-[50px] border flex'>
            <div onClick={()=>settab('hasil')}>Perbandingan</div>
            <div onClick={()=>settab('rincian')}>File</div>
            <div onClick={()=>settab('hash')}>Hash</div>
        </div>
        <div className='md:flex text-cmp rounded-b-lg w-full border'>
          <div><span className='font-bold block my-2'>{value[0].filenamea}</span>
            {tabRender('dokumen 1')}
          </div>
          <div><span className='font-bold block my-2'>{value[1].filenameb}</span>
          {tabRender('dokumen 2')}
          </div>        
        </div>
    </div>

    </div>
  )
}

export default Hasil