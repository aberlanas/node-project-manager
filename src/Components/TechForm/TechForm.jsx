import React, {useState, useCallback} from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Switch } from 'antd';
import Http from "../../Helpers/Http";
import { createTech } from "../../Redux/Actions/TechActions";


import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


import "./TechForm.css";

const TechForm = ({createTech}) => {


  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [previewUrl, setPreviewUrl] = useState();
  const [imgSrc,setImgSrc] = useState(null);
  

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    setImgRef(img);
  }, []);

  const makeClientCrop = async crop => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, 'newFile.jpeg');
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        setImgSrc(canvas.toDataURL('image/jpeg',1.0));
        blob.name = fileName;
        
        console.log(blob);
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };





    const onFinish = async (values) => {
        console.log(values);
        values.tech.logo=imgSrc;
        const result = await Http.post(values,'/api/techs/createTech');
        if(result){
          // TODO
          // Arreglar esto cuando se pueda
          result.key=result.id;
          createTech(result);
        }   
    }


    const layout = {

        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 20,
        },
      };
   
    return (
        <div className="techForm">
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['tech', 'nombre']}
            label="Nombre"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['tech', 'descripcion']}
            label="Descripcion"
            rules={[
                {
                    required: true,
                  },
            ]}
           
          >
            <Input />
            </Form.Item>

    
          <Form.Item name={['tech', 'version']} label="Version"
          rules={[
            {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
         
          <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={makeClientCrop}
      />


      <Form.Item name={['tech', 'logo']} label="Logo"
      rules={[
        {
            required: false,
          },
        ]}
      >
        {previewUrl && <img alt="Crop preview" src={previewUrl} />}
        {/*previewUrl && console.log(previewUrl)*/}
        </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Crear y Continuar
            </Button>
          </Form.Item>


      

        </Form>
        </div>
      );
};


export default connect(null,{createTech})(TechForm);

