
// script.js - Part 3 functionality: form validation, enquiry estimate, lightbox, simple accordion

document.addEventListener('DOMContentLoaded', function() {
  // Contact form handling: compile into mailto and open mail client
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      var name = encodeURIComponent(document.getElementById('name').value.trim());
      var email = encodeURIComponent(document.getElementById('email').value.trim());
      var phone = encodeURIComponent(document.getElementById('phone').value.trim());
      var service = encodeURIComponent(document.getElementById('service').value);
      var message = encodeURIComponent(document.getElementById('message').value.trim());
      var subject = encodeURIComponent('Website contact form: ' + service);
      var body = encodeURIComponent('Name: ' + name + '\\nEmail: ' + email + '\\nPhone: ' + phone + '\\nService: ' + service + '\\n\\nMessage:\\n' + message);
      var mailto = 'mailto:info@example.com?subject=' + subject + '&body=' + body;
      // open mail client
      window.location.href = mailto;
    });
  }

  // Enquiry form handling: estimate calculator + validation
  var enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    var etype = document.getElementById('etype');
    var serviceBlock = document.getElementById('serviceBlock');
    var unitsBlock = document.getElementById('unitsBlock');
    etype.addEventListener('change', function() {
      if (etype.value === 'service') {
        serviceBlock.style.display = 'block';
        unitsBlock.style.display = 'block';
      } else {
        serviceBlock.style.display = 'none';
        unitsBlock.style.display = 'none';
      }
    });
    enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!enquiryForm.checkValidity()) {
        enquiryForm.reportValidity();
        return;
      }
      var name = document.getElementById('ename').value.trim();
      var email = document.getElementById('eemail').value.trim();
      var phone = document.getElementById('ephone').value.trim();
      var type = document.getElementById('etype').value;
      var service = document.getElementById('eservice').value;
      var units = parseInt(document.getElementById('units').value || '1', 10);
      var details = document.getElementById('emessage').value.trim();
      // Basic pricing rules (starter logic)
      var base = 0;
      switch(service) {
        case 'callout': base = 500; break;
        case 'coc': base = 700; break;
        case 'rewire': base = 1200; break;
        case 'lighting': base = 350; break;
        case 'solar': base = 1500; break;
        default: base = 500;
      }
      var estimate = base * Math.max(1, units);
      var vat = Math.round(estimate * 0.15);
      var total = estimate + vat;
      var result = document.getElementById('estimateResult');
      result.style.display = 'block';
      result.innerHTML = '<div class="estimate-box" style="background:#fff;padding:1rem;border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,0.08);"><h3>Estimate summary</h3>' +
        '<p><strong>Name:</strong> ' + escapeHtml(name) + '</p>' +
        '<p><strong>Type:</strong> ' + escapeHtml(type) + ' ' + (service ? '(' + escapeHtml(service) + ')' : '') + '</p>' +
        '<p><strong>Units:</strong> ' + units + '</p>' +
        '<p><strong>Estimated cost (ex. VAT):</strong> R' + numberWithCommas(estimate) + '</p>' +
        '<p><strong>VAT (15%):</strong> R' + numberWithCommas(vat) + '</p>' +
        '<p><strong>Estimated total (inc. VAT):</strong> R' + numberWithCommas(total) + '</p>' +
        '<p style="margin-top:0.5rem;">This is a preliminary estimate — final quotation follows a site visit.</p>' +
        '<button id="sendEnquiryEmail">Send enquiry by email</button></div>';
      var sendBtn = document.getElementById('sendEnquiryEmail');
      sendBtn.addEventListener('click', function() {
        var subject = encodeURIComponent('Enquiry: ' + (service || type));
        var body = encodeURIComponent('Name: ' + name + '\\nEmail: ' + email + '\\nPhone: ' + phone + '\\nType: ' + type + '\\nService: ' + service + '\\nUnits: ' + units + '\\n\\nDetails:\\n' + details + '\\n\\nEstimated total (inc VAT): R' + total);
        window.location.href = 'mailto:info@example.com?subject=' + subject + '&body=' + body;
      });
    });
  }

  // Simple lightbox for images in services grid
  document.querySelectorAll('.services-grid img, .services-section img, article img').forEach(function(img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      openLightbox(img.src, img.alt || '');
    });
  });

  function openLightbox(src, alt) {
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 2000;
    overlay.innerHTML = '<div style="max-width:90%;max-height:90%;"><img src="'+src+'" alt="'+alt+'" style="max-width:100%;max-height:80vh;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.5);"><div style="text-align:center;margin-top:0.5rem;color:#fff;">'+escapeHtml(alt)+'</div></div>';
    overlay.addEventListener('click', function(){ document.body.removeChild(overlay); });
    document.body.appendChild(overlay);
  }

  // Utility helpers
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function escapeHtml(text) {
    return text.replace(/[&<>"'\/]/g, function (s) {
      var entityMap = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'};
      return entityMap[s];
    });
  }
});
