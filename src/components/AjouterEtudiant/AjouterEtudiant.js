import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './AjouterEtudiant.css'

function AjouterEtudiant() {
  return (
    <div>
      <form class="form-ajouter">
        <div className='ajout-brand'>
          <h1 class="ajout-brand"> Ajouter des Etudiants </h1>
        </div>
        <div class="row-2">
          <label>Nom : </label>
          <input type='text' placeholder='exemple : RAKOTO' className='nom-input'/>
        </div>
          
        <div class="row-2">
          <label>Prénoms : </label>
          <input type='text' placeholder='exemple : koto' className='prenom-input'/>
        </div>
          
        <div class="row-2">
          <label>Numéro Matricule : </label>
          <input type='number' placeholder='exemple : 200000' className='matricule-input'/>
        </div>
            
        <div class="row-2">
          <label>Adresse : </label>
          <input type='text' placeholder='Adresse' className='adresse-input'/>
        </div>
        <div class="row-2">
          <button type='submit' className='btn btn-primary'> Ajouter </button>
        </div>
      </form>
    </div>
  );
}

export default AjouterEtudiant;