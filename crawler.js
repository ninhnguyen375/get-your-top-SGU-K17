const fs = require('fs');
const Crawler = require('crawler');

const diemK17FilePath = './db/DiemHe4_K17.json';
const diemK18FilePath = './db/DiemHe4_K18.json';
const diemK17FilePath__DTN = './db/DiemHe4_K17__DTN.json';
const diemK18FilePath__DTN = './db/DiemHe4_K18__DTN.json';

const diemK17Data = [];
const diemK18Data = [];
const diemK17__DTN = [];
const diemK18__DTN = [];

let studentName = [];
let diemHe4 = [];
let diemHe4Cua1SV = '';
const urls = [];

const c = new Crawler({
  maxConnections: 1000,
  jQuery: true,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
      const data = {
        mssv: res.options.uri.split('id=')[1],
        diem: parseFloat(
          $('.row-diemTK')
            .eq(3)
            .find('.Label')
            .eq(1)
            .text()
        )
      };

      if (data.diem) {
        diemK18Data.push(data);
      }
    }
    done();
  }
});

setTimeout(() => {
  fs.writeFile(diemK18FilePath, JSON.stringify(diemK18Data), err => {
    err && console.log(err);
  });
  console.log('done');
}, 10000);

for (let i = 3118410000; i < 3118410400; i++) {
  urls.push(
    'http://thongtindaotao.sgu.edu.vn/Default.aspx?page=xemdiemthi&id=' + i
  );
}

const getInfo = urls => {
  c.queue(urls);
};

getInfo(urls);
