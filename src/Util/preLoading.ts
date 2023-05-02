import back from "../Asset/Img/Back/back_img10.jpg";
import man1 from "../Asset/Img/Man/man_img1.png";
import man2 from "../Asset/Img/Man/man_img2.png";
import man4 from "../Asset/Img/Man/man_img4.png";
import man5 from "../Asset/Img/Man/man_img5.png";
import man7 from "../Asset/Img/Man/man_img7.png";
import man9 from "../Asset/Img/Man/man_img9.png";

const imageList = [back, man1, man2, man4, man5, man7, man9];

export default function preLoading() {
  imageList.forEach((url) => {
    const image = new Image();
    image.src = url;
  });
}
