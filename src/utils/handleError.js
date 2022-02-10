

export const handleError = (error) => {
    let message=null
    if(error.includes('user-not-found')){
        message="cet Email n'existe pas dans notre base veuillez consulter l'Administration "
    }
    if(error.includes('wrong-password')){
        message="Erreur dans votre mot de passe "
    }
    if(error.includes('internal-error')){
        message="Email/mot de passe invalid "
    }
    if(error.includes('weak-password')){
        message="Le mot de passe doit comporter au moins 6 caractères "
    }
    if(error.includes('user-disabled')){
        message="Votre compte est disactivé, veuillez consulter l'administration "
    }




    return message;
};


