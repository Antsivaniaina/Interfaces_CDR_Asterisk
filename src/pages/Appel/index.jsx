import React, {useState, useEffect} from 'react';
import '../styles.css';
import axios from 'axios';
import { SimpleDropdown } from 'react-js-dropdavn';
import 'react-js-dropdavn/dist/index.css';
import Swal from 'sweetalert2';
import Datatable from 'react-data-table-component';
import ReactSelect from 'react-select';

import 'styled-components'
import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CFormInput,
//   CFormLabel,
   CFormFloating,
//   CFormSelect,
//   CFormTextarea,
//     CRow,
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'


const colonne = [
    {
        name: 'Date de l\'appel',
        selector: row => row.calldate,
        sortable: true
    },
    {
        name: 'Heure de l\'appel',
        selector: row => row.heure,
        sortable : true
    },
    {
        name: 'Appelant',
        selector: row => row.src,
        sortable : true
    },
    {
        name: 'Destinataire',
        selector: row => row.dst,
        sortable : true
    },
    {
        name: 'Durée de l\'appel',
        selector: row => row.duration,
        sortable : true
    },
    {
        name: 'Statut',
        selector: row => row.disposition,
        sortable : true
    },
    {
        name: 'Indicateur AMA',
        selector: row => row.amaflags,
        sortable : true
    },
    {
        name: 'Identifiant de l\'appel',
        selector: row => row.uniqueid,
        sortable : true
    },


];

const customFrenchText = {
    pagination: {
        next: 'Suivant',
        previous: 'Précedent',
        rowsPerPage: 'Lignes par pages',
        displayRows: 'sur',
        
    },
};



function Appel() {
    const currentDate = new Date().toISOString().split('T')[0]; 
    const [appel, setAppel] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [endDate, setEndDate] = useState(currentDate);
    const [startDate, setStartDate] = useState(currentDate);
    const [duree, setDuree] = useState('');
    const [destination, setDestination] = useState('');
    const [source, setSource] = useState('');
    const [status, setStatus] = useState('');
    const [heure, setHeure] = useState('');

    const rechercheParDate = (data) => {
        if (startDate === '' && endDate === '') {
            return data;
        } else {
            return data.filter(item => (
            item.calldate >= startDate && item.calldate <= endDate 
        ));
        }
        
    };
    const rechercheDuree= (data) => {
        if (duree === '') {
            return data;
        } else {
            return data.filter(item => (
            parseInt(item.duration) >= parseInt(duree) 
        ));
        }
    };
    
    const affichageRecherche = (data) => { 
        if (!selectedOption || selectedOption.length === 0) {
            return data;
        }
        let filteredData = [...data];
        selectedOption.forEach((option) => {

            switch (option) {
                case 'date':
                    filteredData = rechercheParDate(filteredData);
                    break;
                case 'durée':
                    filteredData = rechercheDuree(filteredData);
                    break;
                default:
                    filteredData = data;
        }
         });
        
       return filteredData;
    };

    const renderInput = (selectionner) => { 
        switch (selectionner) {
            case 'date':
                return (
                    <>
                        <CForm className="row gy-2 gx-3 align-items-center ">
                            <CCol sm={6}>
                                <CFormFloating className="mb-3">
                                    <CFormInput type="date" id="floatingInput" value={startDate} onChange={(event) => { setStartDate(event.target.value)}}/>
                                    <CFormLabel htmlFor="floatingInput">Du :</CFormLabel>
                                </CFormFloating>
                            </CCol>
                            <CCol sm={6}>
                                <CFormFloating className="mb-3">
                                    <CFormInput type="date" id="floatingInput" disabled={!startDate} value={endDate} onChange={(event) => { setEndDate(event.target.value)}}/>
                                    <CFormLabel htmlFor="floatingInput">Au :</CFormLabel>
                                </CFormFloating>
                            </CCol>
                        </CForm>
                    </>
                );
            case 'durée':
                return (   
                   <CFormFloating>
                        <CFormInput type="number" id="floatingInput" onChange={(event) => { setDuree(event.target.value)}}/>
                    <CFormLabel htmlFor="floatingInput">Durée de l'appel</CFormLabel>
                </CFormFloating>
                );
            
            case 'destination':
                return (   
                   <CFormFloating>
                    <CFormInput type="number" id="floatingInput"/>
                    <CFormLabel htmlFor="floatingInput">Entre le numéro du destination de l'appel :</CFormLabel>
                </CFormFloating>
                );
            case 'source':
                return (   
                   <CFormFloating>
                    <CFormInput type="number" id="floatingInput"/>
                    <CFormLabel htmlFor="floatingInput">Entre le numéro de la source de l'appel :</CFormLabel>
                </CFormFloating>
                );
            case 'status':
                return (   
                   <CFormFloating>
                    <CFormInput type="number" id="floatingInput"/>
                    <CFormLabel htmlFor="floatingInput">Séléctionner le status de l'appel :</CFormLabel>
                </CFormFloating>
                );
            case 'heure':
                return (   
                   <CFormFloating>
                    <CFormInput type="time" id="floatingInput"/>
                    <CFormLabel htmlFor="floatingInput">Entre l'heure de l'appel :</CFormLabel>
                </CFormFloating>
                );
            
            default:
                return null;
        }
    };
    
    useEffect(() => {
        axios.get('http://localhost/www.cdr.com/ReactNotes/src/backend/appel/affichage_appel.php')
            .then(response => {
                setAppel(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de l\'affichage des donnée :', error)
            })
        // fetchAppelData();
    }, []);
        
    // Search
   
    const data = [
        { label: 'Date', value: 'date' },
        { label: 'Durée', value: 'durée' },
        { label: 'Destination', value: 'destination' },
        { label: 'Source', value: 'source' },
        { label: 'Status', value: 'status' },
        { label: 'Heure d\'appel', value: 'heure' },
    ];
    const label = {
        notFoundSearch : 'Introuvable',    

        notSelected : 'Recherche',

        //selectedPrefix : 'Votre choix :',

        search : 'Champ',

        seachInputPlaceholder : 'Taper pour chercher',

        }


    return(
        <div className='dashboard-content-container'>
            <div className='dashboard-content-header'>
                <h2>Liste des appels</h2>
            </div>
            <CCol sm={3}>
                 <ReactSelect
                options={data}
                isMulti
                onChange={(selected) => {
                    setSelectedOption(selected ? selected.map(option => option.value) : []);
                }}
                placeholder="Rechercher ..."
                />
                
            </CCol>
            <CCol sm={8}>
                {selectedOption.map((option) => {
                    return renderInput(option);
                })}
            </CCol>
            <div>
                <Datatable
                columns={colonne}
                data={affichageRecherche(appel)}
                pagination
                searchable
                responsive
            />
            </div>

        </div>
)
}

export default Appel;