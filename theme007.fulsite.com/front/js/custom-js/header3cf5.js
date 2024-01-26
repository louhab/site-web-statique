
setTimeout(function(){$(window).scroll(function(){if($(window).scrollTop()>$("nav").height()){$("nav.navbar").addClass("show-menu")}else{$("nav.navbar").removeClass("show-menu");$("nav.navbar .navMenuCollapse").collapse({toggle:false});$("nav.navbar .navMenuCollapse").collapse("hide")}});
const logoImage=document.querySelector('#logo-nav')

if(logoImage.srcset==='/images/logo/602297ceef3a5.png')
logoImage.alt=window.location.href.split(".")[0].split("//")[1]},2);