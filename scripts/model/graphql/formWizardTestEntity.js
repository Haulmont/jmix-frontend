const formWizardTestEntityQuery = `
{
    id
    _instanceName
    notNull
    date
    time
    integer
    associationO2O {
        id
        _instanceName
    }
    compositionO2O {
        id
        _instanceName
        name
    }
}
`;

module.exports = formWizardTestEntityQuery;