import { useState, useEffect, useRef  } from 'react'
import Head from 'next/head'
import Header from '../Components/Header'
import InputPromotTextarea from '../Components/InputPromotTextarea'
import Button from '../Components/Button'
import Status from '../Components/Status'
import { useCopyToClipboard } from 'usehooks-ts'
import { toast,ToastContainer } from 'react-toastify'
import axios from 'axios';
import ImagesContainer from '../Components/ImagesContainer'


export default function Home() {

  const [value, copy] = useCopyToClipboard();
  const responseSectionRef = useRef(null);

  const [topicObj, setTopicObj] = useState(null);
  const [status, setStatus] = useState(null);
  const [generatedChoices, setGeneratedChoices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clearTextarea, setClearTextarea] = useState(false);
  const [images, setImages] = useState([]);
  
  /* Toogles loader */
  const toggleLoader = (value) => {
    setIsLoading(value);
  }

 /* Copies generated status on copy button click */
  const copyText = (text) => {
    copy(text);
    toast.info('Status Copied');
  }
  
/* Calls internal api for generating status */
  const generateStatus = () => {
    setGeneratedChoices(null);
    if(!topicObj?.topic) return toast.error('Please type what kind of status you want');

    const payload = {
      topic: topicObj?.topic,
      isLimitedChar: topicObj?.isLimitedChar,
      generateImage: topicObj?.generateImage,
    };
    
    generateImage(payload);

    toggleLoader(true)
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/generate-whatsapp-status`, payload)
    .then((res) => {
      const choices = res.data?.choices[0]?.message?.content;
      const allChoices = choices.split('\n').map(quote => quote?.replace(/\d+\.\s+/g, '').replace(/\\/g, '')?.replace(/"/g, '')?.trim()).filter(quote => quote !== '');
      setGeneratedChoices(allChoices)
      toggleLoader(false);
      setClearTextarea(!clearTextarea);
      setTopicObj(null);
      responseSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    })
    .catch((err) => {
      toggleLoader(false);
      toast.error(err?.response?.data?.error)
    })
  }

  /* generates images */
  const generateImage = (payload) => {
    if(!payload.generateImage) return;
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/get-images`, payload)
    .then((res) => {
      const data = res.data;
      const large2xImages = data.map((image) => ({ imgUrl: image.src.large2x , alt: image?.alt}));
      setImages(large2xImages);
    })
    .catch((err) => { 
      toast.error(err?.response?.data?.error);
    })
  }

/* Regenerate button click loops through the already existing array of response*/
const regenerate = () => {
    if(status && generatedChoices){
     const indexOfCurrentStatus = generatedChoices.indexOf(status);
    if(generatedChoices?.length > 0 && indexOfCurrentStatus < generatedChoices.length - 1) {
      setStatus(generatedChoices[indexOfCurrentStatus + 1]);
    } else {
      toast.error('Re-generation limit reached | Try new topic')
    }
   }
}

/* Gets promot input values along with character check */
const handlePromtChange = (promtValue) => {
  setTopicObj(promtValue);
};

/* sets first status from the response as default */
 useEffect(() => {
    if(generatedChoices) {
     setStatus(generatedChoices[0]);
    }
 },[generatedChoices])


  return (
    <>
      <Head>
        <title>WhatsApp | Instagram Status Generator | Ultimate Status Generator</title>
        <meta property="og:title" content="Create Captivating WhatsApp & Instagram Statuses with our Ultimate Status Generator | Boost Engagement" key="title" />
        <meta property="og:title" content="Create Captivating WhatsApp & Instagram Statuses with our Ultimate Status Generator | Boost Engagement" key="title" />
        <meta property="og:image" content="/og.jpg" />
        <meta property="og:image:secure_url" content="/og.jpg" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        <Header />
        <InputPromotTextarea handlePromtChange={handlePromtChange} clearTextarea={clearTextarea}/>
        <Button label="Generate new status" color="#25D366" onClick={generateStatus} disabled={isLoading}/>
       <div ref={responseSectionRef}>
        {generatedChoices ? (
        <div>
          <Status status={status}/>
          <Button label="Copy" color="#1590E9" onClick={() => copyText(status)}/>
          <div className='mt-4'>
            <Button label="Re-generate " color="#25D366" onClick={regenerate}/>
          </div>
          {topicObj?.generateImage ? <ImagesContainer images={images}/>: ''}
        </div>
        ): ''}
        </div>
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
       />
      </div>
    </>
  )
}
