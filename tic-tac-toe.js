var ttc = (function() {
    var gameModel = [],
        turn = false;
    
    


    return {
        addStep: addStep,
        reset: reset,
        init: init
    }

    function initGameModel() {
        var r = 0,
            c = 0;
        for(i = 1; i <= 9; i++) {
            gameModel[r] = gameModel[r] || [];
            gameModel[r][c] = '';
            c++;
            if(i % 3 === 0) {
                r++;
                c=0;
            }
        }
    }

    function addStep(character, pos) {
        if(!gameModel[pos.x][pos.y]) {
            gameModel[pos.x][pos.y] = character;
        }
        checkPattern();
    }   

    function reset() {
        gameModel = [];
    }

    function init() {
        var container = document.querySelector('.game-container');
        container.addEventListener('click', handleClick);
        initGameModel();

    }
    
    function handleClick(event) {
        var el = event.srcElement,
            parentEl = el.parentElement,
            char = ''
        if(el.classList.contains('column')) {
            var position  = {
                x: parentEl.dataset.i,
                y: el.dataset.i
            };
            char = turn ? 'O' : 'X';
            turn = !turn;
            addStep(char, position);
            updateDom(el, char);

        }
    }

    function checkPattern() {
        var matched  = [];
        gameModel.forEach(function(row) {
            var prev;
            row.forEach(function(col) {
                if(prev != col) {
                    matched = [];
                } else {
                    matched.push(row, col);
                }
            });

            if(matched.length === 6) {
                return;
            }
        });

        console.log(matched);
    }

    function updateDom(element, char) {
        element.innerText = char;
    }

})();