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
  cilMediaPlay,
  cilCheck,
  cilX
} from '@coreui/icons';
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
} from '@coreui/react';
import { getStyle } from '@coreui/utils';


function Dashboard() {
  const [totalappelManquer, setTotalappelManquer] = useState([]);
  const [totalappel, setTotalappel] = useState([]);
  const [totalappelRepondu, setTotalappelRepondu] = useState([]);
  //const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const [appelsParHeure, setAppelsParHeure] = useState([]);
  
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
    const fetchAppelsParHeure = async () => {
      try {
        const response = await axios.get(
          'http://localhost/www.cdr.com/ReactNotes/src/backend/appel/getAppelParHeure.php'
        );
        setAppelsParHeure(response.data);
       // Stocker les données d'appels par heure dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'appels par heure :', error);
      }
    };

    fetchAppelsParHeure();
       
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
                icon={<CIcon icon={cilCheck} height={36} />}
                value={totalappelRepondu}
                title="Appel avec réponse"
                progress={{ color: 'success',value: (totalappelRepondu*100/totalappel) }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={10} md={3} >
              <CWidgetStatsC
                icon={<CIcon icon={cilX} height={36} />}
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
                Fréquence des appels en 24H
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels : appelsParHeure.map((heureAppel) => `${heureAppel.heure}h`),
              datasets: [
                {
                  label: 'Nombre d\' appel',
                  backgroundColor: 'rgba(75, 192, 192, 0.4)',
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: appelsParHeure.map((heureAppel) => heureAppel.nombreAppels),
                  fill: false,
                  tension: 0,
                }
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
                    drawOnChartArea: true,
                    display: true,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                    display: true,
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
          <CCard className="mb-4">
  {/* <CCardBody>
    <CRow>
      <CCol sm={5}>
        <h4 id="traffic" className="card-title mb-0">
          Statuts d'appels
        </h4>
      </CCol>
    </CRow>
    <CChartBar
      style={{ height: '300px', marginTop: '40px' }}
      data={{
        labels: ['Répondu', 'Non répondu', 'Occupé', 'Autre'],
        datasets: [
          {
            label: 'Nombre d\'appels',
            backgroundColor: [
              getStyle('--cui-success'),
              getStyle('--cui-danger'),
              getStyle('--cui-warning'),
              getStyle('--cui-info'),
            ],
            data: [totalappelRepondu, totalappelManquer, totalappel - (totalappelRepondu + totalappelManquer), totalappel - (totalappelRepondu + totalappelManquer)],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: true,
              display: true,
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250,
              display: true,
            },
          },
        },
      }}
    />
  </CCardBody> */}
</CCard>
            </div>
        </div>
    )
}

export default Dashboard;