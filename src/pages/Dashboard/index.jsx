import React, {useState, useEffect} from 'react';


import '../styles.css';
import axios from 'axios';
import 'react-js-dropdavn/dist/index.css';
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react';
import {
  cilBasket,
  cilPhone,
  cilMediaStop,
  cilMediaPlay
} from '@coreui/icons'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle , hexToRgba} from '@coreui/utils'


function Dashboard() {
  const [totalappelManquer, setTotalappelManquer] = useState([]);
  const [totalappel, setTotalappel] = useState([]);
  const [totalappelRepondu, setTotalappelRepondu] = useState([]);
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
 
  useEffect(() => {
    axios.get('http://localhost/www.cdr.com/ReactNotes/src/backend/appel/getTotal.php')
      .then(response => {
        setTotalappel(response.data[0].totalappel);
      })
      .catch(error => {
        console.error('Erreur lors de l\'affichage des donnée :', error)
      });
    axios.get('http://localhost/www.cdr.com/ReactNotes/src/backend/appel/getTotalRepondu.php')
      .then(response => {
        setTotalappelRepondu(response.data[0].totalappel)
      })
      .catch(error => {
        console.error('Erreur lors de l\'affichage des donnée :', error)
      });
    axios.get('http://localhost/www.cdr.com/ReactNotes/src/backend/appel/getTotalManquer.php')
      .then(response => {
        setTotalappelManquer(response.data[0].totalappel)
      })
      .catch(error => {
        console.error('Erreur lors de l\'affichage des donnée :', error)
      });
       
    }, []);

    return(
        <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Tableau de bord</h2>
                </div>
          <CRow>
            <CCol sm={10} md={3} >
              <CWidgetStatsC
                icon={<CIcon icon={cilPhone} height={36} />}
                value = {totalappel}
                title="Total des appel(s)  "
               
                progress={{ color: 'info', value: 100}}
                className="mb-4"
              />
            </CCol>
             <CCol sm={10} md={3}>
              <CWidgetStatsC
                icon={<CIcon icon={cilMediaPlay} height={36} />}
                value={totalappelRepondu}
                title="Appel avec réponse"
                progress={{ color: 'success',value: (totalappelRepondu*100/totalappel) }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={10} md={3} >
              <CWidgetStatsC
                icon={<CIcon icon={cilMediaStop} height={36} />}
                value = {totalappelManquer}
                title="Appel sans réponse"  
                progress={{ color: 'danger',value: (totalappelManquer*100/totalappel) }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={10} md={3} >
              <CWidgetStatsC
                icon={<CIcon icon={cilBasket} height={36} />}
                value = {totalappel-(totalappelManquer+totalappelRepondu)}
                title="Autre"
               
                progress={{ color: 'warning', value: (totalappel-(totalappelManquer+totalappelRepondu))*100/totalappel}}
                className="mb-4"
              />
            </CCol>
          </CRow>
            <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic des appels
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                 // backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
            </div>
        </div>
    )
}

export default Dashboard;