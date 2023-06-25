import React,{Fragment} from 'react'
import Image from 'next/image';
import styles from "./styles.module.css"
import { Button, Row, Col } from 'react-bootstrap';
import {AiOutlineDownload} from 'react-icons/ai'
import { toast } from 'react-toastify';

export default function ImagesContainer({images}) {

  /* Downloads passed file url */
 const downloadImage = async (imgUrl, alt) => {
  try {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const getExtension = await getExtensionFromUrl(imgUrl);
    link.download = alt + `.${getExtension}`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    toast.error('Error downloading the file')
  }
 }

/* Get file extension from url */
const getExtensionFromUrl = async (url) => {
  const path = new URL(url).pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  const extension = filename.substring(filename.lastIndexOf('.') + 1);
  return extension;
}


 return (
  <>
    {images?.length > 0 ? (
    <div className={styles.imagesContainer}>
      <div className={styles.heading}>Generated Images</div>
      <div className='mt-4'>
        <Row className="justify-content-md-center">
         {images.map((data, i) => (
          <Fragment key={i}>
          <Col xs="4 mb-4 text-center">
            <img src={data?.imgUrl} className={`img-fluid rounded ${styles.generatedImageThumbs}`}/>
            <div className='mt-2'>
              <Button className={styles.downloadButton} size="sm" onClick={() => {
                downloadImage(data?.imgUrl, data?.alt)
              }}>
                <AiOutlineDownload/>
              </Button>
            </div>
          </Col>
          </Fragment>
          ))}
        </Row>
      </div>
    </div>
    ): ''}
    </>
  )
}
