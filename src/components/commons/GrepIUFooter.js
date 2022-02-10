import React from "react";
import {BsGithub} from "react-icons/bs";
import {MdEmail} from "react-icons/md";

const GrepIUNav = () => <>
  <footer className="footer_style mt-3">
    <div className="footer_center">
      <div className="text-center p-1">
        <a href="https://github.com/kimjinmoo"
                                      target="_blank"><BsGithub size={30}/></a>
        <a className="m-2" href="mailto:iukim21c@gmail"><MdEmail size={30}/></a>
      </div>
      <p className="text-center light">대한민국 서울 - Since 2018, GrepIU</p>
    </div>
  </footer>
</>
export default GrepIUNav;
