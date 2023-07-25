import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import axios from 'axios';
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'
import Swal from 'sweetalert2'



function Utilisateur () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [etudiants, setEtudiants] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [formValues, setFormValues] = useState({
        matricule: '',
        nom: '',
        adresse: '',
        niveau: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedEtudiant, setSelectedEtudiant] = useState(null);


    //Afficher les données dans la base 
     const fetchEtudiantsData = async () => {
      try {
          const response = await axios.get('http://localhost/www.gnote.com/ReactNotes/src/backend/login/affichageUser.php');
        if (!response.data) {
          throw new Error('Erreur lors de la récupération des données');
        }
        setEtudiants(response.data); // Met à jour l'état avec les données JSON récupérées
      } catch (error) {
        console.error(error);
      }
    };
     //Ajouter les données dans la base
    const handleFormSubmit = async (e) => {
        try {
            const response = await axios.post('http://localhost/www.gnote.com/ReactNotes/src/backend/etudiant/ajout_etudiant.php', {   
             matricule: formValues.matricule,
             nom: formValues.nom,
             adresse: formValues.adresse,
             niveau: formValues.niveau,
            });

            if (response.status === 200) {
            // La requête s'est bien passée, vous pouvez mettre à jour l'affichage des étudiants
            // Vous pouvez appeler votre fonction de récupération des étudiants ici pour actualiser la liste
            fetchEtudiantsData();

            // Afficher une alerte pour confirmer l'ajout
            Swal.fire({
                title: 'Succès!',
                text: 'Etudiant ajouté avec succès.',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: 'green',
            });

            // Fermer la popup après la soumission du formulaire
            setShowPopup(false);
            } else {
            // Si la requête a échoué, afficher une alerte d'erreur
            Swal.fire({
                title: 'Erreur!',
                text: 'Une erreur est survenue lors de l\'ajout de l\'étudiant.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'red',
            });
            }
        } catch (error) {
            console.error(error);
        }
    };
    //Afficher le formulaire d'ajout
  const handleShowPopup = () => {
           const selectOptions = {
            'Seconde': '1',
            'Première L': '2',
            'Première S': '3',
            'Première OSE': '4',
            'Terminale L': '5',
            'Terminale S': '6',
            'Terminale OSE': '7',
          };
        Swal.fire({
          title: 'Ajouter un étudiant',
          html:`
                <input id="matricule" class="swal2-input" placeholder="Matricule">
                <input id="nom" class="swal2-input" placeholder="Nom">
                <input id="adresse" class="swal2-input" placeholder="Adresse">
                <select id="niveau" class="swal2-select">
                  ${Object.entries(selectOptions)
                    .map(([label, value]) => `<option value="${label}">${label}</option>`)
                    .join('')}
                </select>
              `,
            
          focusConfirm: false,
          //showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Valider',
          confirmButtonColor: 'green', // Couleur verte pour le bouton Valider
          cancelButtonText: 'Annuler',
          cancelButtonColor: 'red', // 
        //   preConfirm: () => {
        //     return {
        //       matricule: document.getElementById('matricule').value,
        //       nom: document.getElementById('nom').value,
        //       adresse: document.getElementById('adresse').value,
        //       niveau: document.getElementById('niveau').value,
        //     };
        //   },
        }).then((result) => {
            if (!result.dismiss) {
                formValues.matricule = document.getElementById('matricule').value;
                formValues.nom = document.getElementById('nom').value;
                formValues.adresse = document.getElementById('adresse').value;
                formValues.niveau = document.getElementById('niveau').value;
              handleFormSubmit();
          }
        });
        };
     // Fonction pour gérer la suppression d'un étudiant
  const handleDelete = async (matricule) => {
    try {
      // Afficher une alerte de confirmation avant de procéder à la suppression
      const confirmation = await Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir supprimer cet étudiant ?',
        text: "Cette action est irréversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
        confirmButtonColor: 'red',
        cancelButtonColor: 'gray',
      });

      // Si l'utilisateur a cliqué sur le bouton "Oui, supprimer", procéder à la suppression
      if (confirmation.isConfirmed) {
        const response = await axios.post('http://localhost/www.gnote.com/ReactNotes/src/backend/etudiant/supprimer_etudiant.php', {
          matricule: matricule,
        });

        if (response.status === 200) {
          // Mettre à jour la liste des étudiants après la suppression réussie
          fetchEtudiantsData();

          // Afficher une alerte pour confirmer la suppression
          Swal.fire({
            title: 'Succès!',
            text: 'Étudiant supprimé avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: 'green',
          });
        } else {
          // Si la suppression a échoué, afficher une alerte d'erreur
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur est survenue lors de la suppression de l\'étudiant.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: 'red',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
    };
    
    // Fonction pour gérer l'édition d'un étudiant
  const handleEdit = (etudiant) => {
    const selectOptions = {
            'Seconde': '1',
            'Première L': '2',
            'Première S': '3',
            'Première OSE': '4',
            'Terminale L': '5',
            'Terminale S': '6',
            'Terminale OSE': '7',
          };
  setSelectedEtudiant(etudiant);
  setEditMode(true);
  // Ouvrir la popup pour l'édition (utiliser les valeurs de l'étudiant sélectionné)
  Swal.fire({
    title: 'Modifier un étudiant',
    html:`
          <input id="matricule" class="swal2-input" placeholder="Matricule" disabled value="${etudiant.matricule}">
          <input id="matricule" style="display:none" class="matricule swal2-input" placeholder="Matricule" value="${etudiant.matricule}">
          <input id="nom" class="swal2-input" placeholder="Nom" value="${etudiant.nom}">
          <input id="adresse" class="swal2-input" placeholder="Adresse" value="${etudiant.adresse}">
          <select id="niveau" class="swal2-select">
            ${Object.entries(selectOptions)
              .map(([label, value]) => `<option value="${label}">${label}</option>`)
              .join('')}
          </select>
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Valider',
    confirmButtonColor: 'green',
    cancelButtonText: 'Annuler',
    cancelButtonColor: 'red',
    didOpen: () => {
      const niveauInput = document.getElementById('niveau');
      const defaultValue = etudiant.niveau; // Définissez ici la valeur initiale que vous souhaitez utiliser
      niveauInput.value = defaultValue;
    },
  }).then((result) => {
    if (!result.dismiss) {
      // Récupérer les valeurs des champs de saisie après l'édition
      const matricule = document.getElementById('matricule').value;
      const nom = document.getElementById('nom').value;
      const adresse = document.getElementById('adresse').value;
      const niveau = document.getElementById('niveau').value;

      // Effectuer ici la requête pour mettre à jour l'étudiant dans la base de données avec les nouvelles valeurs
      axios.post('http://localhost/www.gnote.com/ReactNotes/src/backend/etudiant/modifier_etudiant.php', {
        matricule: matricule,
        nom: nom,
        adresse: adresse,
        niveau: niveau,
      }).then((response) => {
        // Mettre à jour l'état des étudiants après la modification réussie
        fetchEtudiantsData();

        // Afficher une alerte pour confirmer la modification
        Swal.fire({
          title: 'Succès!',
          text: 'Étudiant modifié avec succès.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'green',
        });
      }).catch((error) => {
        console.error(error);
        // Afficher une alerte d'erreur si la requête a échoué
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de la modification de l\'étudiant.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'red',
        });
      });
    }
    setEditMode(false);
    setSelectedEtudiant(null);
  });
};
    
    useEffect(() => {
    }, []);

    return(
        <div className='dashboard-content'>
            
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
            <h2>Liste des utilisateurs</h2>
            <DashboardHeader
                btnText="Créer"
                onClick={() => setShowPopup(true)}
            />
            {showPopup && handleShowPopup()}
                </div>

                <table>
                    <thead>
                        <th>NOM </th>
                        <th>Mot de passe</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {etudiants.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.matricule}</span></td>
                                    <td><span>{order.nom}</span></td>
                                    <td><span>{order.adresse}</span></td>
                                    <td><span>{order.niveau}</span></td>
                                    <td>
                                        {/* Bouton Modifier */}
                                  <button
                                    className='btn btn-warning'
                                        onClick={() => handleEdit(order)} // Appeler la fonction handleEdit avec les données de l'étudiant
                                        >
                                        Modifier
                                        </button>
                                    </td>
                                    <td>
                                        {/* Bouton Supprimer */}
                                        <button
                                        className='btn btn-danger'
                                        onClick={() => handleDelete(order.matricule)} // Appeler la fonction handleDelete avec le matricule de l'étudiant
                                        >
                                        Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
            </div>
        </div>
    )
}

export default Utilisateur;