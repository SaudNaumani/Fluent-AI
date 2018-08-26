import { loadDynamicBannerText } from './components/banner';
import { initUpdateNavbarOnScroll } from './components/navbar';
import $ from "jquery";

loadDynamicBannerText();


 const ask = document.getElementById("ask");
  ask.addEventListener('click', (e) => {
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
    e.preventDefault();
  });
