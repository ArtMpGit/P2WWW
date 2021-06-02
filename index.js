const url = 'http://api.football-data.org/v2/competitions';
var allCompetitions = [];
var brazilianCompetitions = [];
var showAllCompetitions = true;

dateFormatter = (date) => {
    const dateParts = date.split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

preparePageInfo = () => {
    $('#filter-button').html(showAllCompetitions ? 'Mostrar campeonatos brasileiros' : 'Mostrar todos os campeonatos');
    buildTableBody(showAllCompetitions ? allCompetitions : brazilianCompetitions);
}

buildTableBody = (competitions) => {
    $('#competitions').empty();
    competitions.forEach(({ area, name, currentSeason }) => {
        const initialDate = (currentSeason && currentSeason.startDate) ?
            dateFormatter(currentSeason.startDate) :
            'Não informada';

        $('#competitions').append(
            '<tr>' +
            '<td>' + area.name + '</td>' +
            '<td>' + name + '</td>' +
            '<td>' + initialDate + '</td>' +
            '</tr>'
        );
    });
}

$(window).on('load', $.get(url, ({ competitions }) => {
    allCompetitions = competitions;
    brazilianCompetitions = competitions.filter(competition => competition.area.name.toLowerCase() === 'brazil');
    preparePageInfo(competitions);
    $('#filter-button').click(() => {
        showAllCompetitions = !showAllCompetitions;
        preparePageInfo();
    });
}));