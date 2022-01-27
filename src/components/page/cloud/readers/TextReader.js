import {useEffect, useState} from "react";
import {readBlobCloud} from "../../../../services/service";
import ImageViewer from "react-simple-image-viewer";
import styled from "styled-components";

const Wrapper = styled.div`
  #ReactSimpleImageViewer {
    z-index: 9999;
  }
`;

/**
 *
 * 이미지 리더
 *
 * @constructor
 */
const TextReader = ({
  id,
  close
}) => {
  const [image, setImages] = useState([]);

  const fetchFile = () => {
    readBlobCloud(id).then(res => {
      let image = [];
      image.push(URL.createObjectURL(res));
      setImages(image);
    })
  }
  useEffect(() => {
    fetchFile();
  }, [id])

  return <Wrapper>
    <ImageViewer
        src={image}
        disableScroll={true}
        onClose={close}
        currentIndex={0}
        backgroundStyle={{
          backgroundColor: "rgba(0,0,0,0.9)"
        }}
        closeOnClickOutside={true}
    />
  </Wrapper>
}

export default TextReader;
