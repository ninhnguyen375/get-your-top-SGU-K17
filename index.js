require('dotenv').config();
const express = require('express');
const app = express();
const Crawler = require('crawler');

let studentName = [];
let diemHe4 = [];
let diemHe4Cua1SV = '';
const urls = [];

app.set('view engine', 'pug');
app.use(express.static('public'));

const c = new Crawler({
  maxConnections: 1000,
  jQuery: true,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
      // studentName.push(
      //   $('#ctl00_ContentPlaceHolder1_ctl00_lblContentTenSV').text()
      // );
      diemHe4.push(
        parseFloat(
          $('.row-diemTK')
            .eq(1)
            .find('.Label')
            .eq(1)
            .text()
        )
      );
    }
    done();
  }
});
const c2 = new Crawler({
  maxConnections: 1000,
  jQuery: true,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
      // studentName.push(
      //   $('#ctl00_ContentPlaceHolder1_ctl00_lblContentTenSV').text()
      // );
      diemHe4Cua1SV = parseFloat(
        $('.row-diemTK')
          .eq(1)
          .find('.Label')
          .eq(1)
          .text()
      );
    }
    done();
  }
});

const getInfo = urls => {
  c.queue(urls);
};

const getInfoOfID = async url => {
  await c2.queue(url);
};

for (let i = 3117410000; i < 3117410400; i++) {
  // urls.push(
  //   'http://thongtindaotao.sgu.edu.vn/default.aspx?page=thoikhoabieu&sta=0&id=' +
  //     i
  // );
  urls.push(
    'http://thongtindaotao.sgu.edu.vn/Default.aspx?page=xemdiemthi&id=' + i
  );
}

getInfo(urls);

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/api/:id', async (req, res) => {
  const { id } = req.params;
  await getInfoOfID(
    'http://thongtindaotao.sgu.edu.vn/Default.aspx?page=xemdiemthi&id=' + id
  );

  res.send({ studentName, diemHe4, diemHe4Cua1SV });
});
app.listen(3000);
