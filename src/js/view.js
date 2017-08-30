import controller from './controller';

class View {

  updateSelZone = data => {
    document.querySelector('.sel-zone').innerHTML =
      data
        .map(zone => `<option value='${zone}'>${zone}</option>`)
        .reduce((res, opt) => res + opt, "<option value=''>--請選擇行政區--</option>");
  };

  updateView = (zone = '所有區', data) => {
    // update zoneName
    document.querySelector('.zone-name').textContent = zone;

    // update records
    this.updateRecords(data);

    // update pagination
    this.updatePagination();
  };

  updateRecords = (data) => {
    document.querySelector('.records').innerHTML =
      data
        .map((item, idx) => {
          let result = "";
          if (idx % 2 === 0) {
            result += "<div class='row'>";
          }
          result +=
            `<div class="col-xs-12 col-sm-6">
               <div class="item">
                   <div class="item-img">
                       <img src="${item.Picture1}">
                       <div class="item-title clearfix">
                           <h3 class="pull-left item-name">${item.Name}</h3>
                           <h4 class="pull-right item-zone">${item.Zone}</h4>
                       </div>
                   </div>
                   <ul class="list-unstyled item-content">
                       <li><img src=${require('icons_clock.png')}><span class="item-opentime">${item.Opentime}</span></li>
                       <li><img src=${require('icons_pin.png')}><span class="item-add">${item.Add}</span></li>
                       <li><img src=${require('icons_phone.png')}><span class="item-tel">${item.Tel}</span></li>
                   </ul>
                   <div class="item-info">
                       <img src=${require('icons_tag.png')}><span class="item-ticketinfo">${item.Ticketinfo}</span>
                   </div>
               </div>
           </div>
         `;
          if (idx % 2 === 1) {
            result += "</div>";
          }
          return result;
        })
        .reduce((res, item) => res + item, "");
  };

  updatePagination = () => {
    let paginationItems = '';
    for (let i = 1; i <= controller.getPageTotal(); i++) {
      paginationItems +=
        `<li ${controller.getCurrentPage() === i ? 'class="active"' : ''}>
           <a href="#" data-type="num" data-idx="${i}">${i}</a>
         </li>
        `;
    }
    document.querySelector('.pagination').innerHTML =
      `<li ${controller.getCurrentPage() === 1 ? 'class="disabled"' : ''}>
           <a href="#" data-type="prev">&lt; Prev</a>
       </li>
       ${paginationItems}
       <li ${controller.getCurrentPage() === controller.getPageTotal() ? 'class="disabled"' : ''}>
           <a href="#" data-type="next">&gt; Next</a>
       </li>
      `;
  };

}

const view = new View();

export default view;