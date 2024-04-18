export default {
  common: {
    technicalError:
      'Une erreur technique est survenue. Réessayer plus tard ou contacter le support',
    dateFormat: 'Format jj/mm/aaaa',
  },
  index: {
    subtitle: 'Un outil pour gérer simplement vos stocks',
    createProductText: 'Créez vos fiches produits et gérez leur stock',
    createCustomersText: 'Renseignez vos contacts fournisseurs et clients',
    createOrdersText:
      'Créez des commandes pour ajouter du stock et enregistrez les achats clients',
  },
  buttons: {
    reset: 'Reset',
    create: 'Créer',
    edit: 'Modifier',
    detail: 'Détail',
    order: 'Commander',
    close: 'Fermer',
    duplicate: 'Dupliquer',
  },
  forms: {
    mandatory: 'Champ obligatoire',
    yourEmail: 'Votre email',
    yourPassword: 'Votre mot de passe',
    repeatPassword: 'Répétez le mot de passe',
    repeatCorrectlyPassword: 'Répétez correctement le mot de passe',
    editMode: 'Mode édition',
  },
  auth: {
    badLogin: 'Identifiants incorrects',
    technicalError: 'Erreur lors de la connexion',
    loginOk: 'Connecté',
    loginAction: 'Se connecter',
    logoutAction: 'Se déconnecter',
    signUpAction: "S'inscrire",
    weakPassword: 'Le mot de passe doit contenir au moins 6 caractères',
    emailExists: 'Cet email est déjà utilisé',
  },
  product: {
    referenceExists: 'Cette référence produit existe déjà',
    created: 'Produit créé avec succès',
    edited: 'Produit modifié avec succès',
    reference: 'Référence produit',
    providerReference: 'Référence fournisseur',
    providerRef: 'Réf. fournisseur',
    name: 'Nom',
    sellPrice: 'Prix de vente HT',
    quantity: 'Stock',
    enterValidSellPrice: 'Entrer un prix de vente valide',
    newProduct: 'Nouveau produit',
    detail: 'Détail produit',
  },
  provider: {
    newProvider: 'Nouveau fournisseur',
    name: 'Nom',
    phone: 'Téléphone',
    email: 'Email',
    detail: 'Détail fournisseur',
  },
  order: {
    newOrder: 'Nouvelle commande fournisseur',
    newSale: 'Nouvelle commande client',
    reference: 'Référence commande',
    orderDate: 'Date de la commande',
    receiptDate: 'Date de réception',
    provider: 'Fournisseur',
    addedProducts: 'produits ajoutés',
    cartContent: 'Contenu de la commande',
    quantity: 'Quantité',
    receivedQty: 'Quantité reçue',
    shortQty: 'Qté commandée',
    shortReceivedQty: 'Qté reçue',
    price: "Prix d'achat",
    enterValidBuyPrice: "Entrer un prix d'achat valide",
    enterValidQuantity: 'Entrer une quantité valide',
    created: 'Commande fournisseur créée avec succès',
    received: 'Commande fournisseur réceptionnée avec succès',
    confirm: 'Finaliser la commande',
    confirmError: 'Erreur technique lors de la validation de la commande',
    totalAmount: 'Total de la commande',
    recipient: 'Destinataire',
    customer: 'Client',
  },
  customer: {
    newCustomer: 'Nouveau client',
    name: 'Nom client',
    address: 'Adresse',
    country: 'Pays',
    email: 'Email',
    phone: 'Téléphone',
    detail: 'Détail client',
  },
  menu: {
    menu: 'Menu',
    products: 'Produits',
    providers: 'Fournisseurs',
    orders: 'Commandes fournisseurs',
    sales: 'Commandes clients',
    customers: 'Clients',
  },
};
