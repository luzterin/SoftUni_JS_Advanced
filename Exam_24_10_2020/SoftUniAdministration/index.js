function solve() {
    let inputs = Array.from(document.querySelectorAll('.form-control'));
    let lectureName = inputs[0].children[1];
    let date = inputs[1].children[1];
    let moduleType = inputs[2].children[1];
    let addButton = inputs[3].children[0];
    addButton.addEventListener('click', addClicked);

    function addClicked(event) {
        if (!lectureName.value || !date.value || moduleType.value == 'Select module') {
            return;
        }
        event.preventDefault();

        let { liEl, h4El, buttonEl, ulEl, divEl, h3El, divTrainingParentElement } = setTraingsElements();

        let modules = Array.from(document.querySelectorAll('.modules'))[0].children[0];

        //first Time append
        if (!modules) {
            appendNewModule();
            return;
        }
        //newly selected h3
        let selectedH3 = Array.from(document.querySelectorAll('.module > h3'));
        let h3lowerAsOriginal = selectedH3[selectedH3.length - 1].textContent.split('-')[0].toLowerCase();
        let findModule = selectedH3.find((x) => {
            console.log(x.textContent);
            let result = x.textContent.split('-')[0].toLowerCase().localeCompare(moduleType.value.toLowerCase())
            return x;
        });
        let divModule = findModule.parentElement;
        let result = h3lowerAsOriginal.localeCompare(moduleType.value.toLowerCase())
        //add to the same Module
        if (result == 0) {

            liEl.appendChild(h4El);
            liEl.appendChild(buttonEl);
            let selectedUl = Array.from(document.querySelectorAll('.module > ul'));
            let lastSelectUl = selectedUl[selectedUl.length - 1];
            lastSelectUl.appendChild(liEl);

            // select previous h4el and add this one before or behind it.
            let allDates = Array.from(document.querySelectorAll(`.module`)[0].children[1].children);
            let newAllDates = sortInsideLiElements(allDates);

            // delete all liElements
            for (const liElement of allDates) {
                liElement.remove();
            }
            //append new sorted li elements
            for (const liElement of newAllDates) {

                lastSelectUl.appendChild(liElement);
            }

        } else {
            appendNewModule();
        }

        function setTraingsElements() {
            let divTrainingParentElement = Array.from(document.querySelectorAll(`.user-view > .modules`))[0];

            let divEl = document.createElement('div');
            divEl.className = 'module';
            let h3El = document.createElement('h3');
            h3El.textContent = `${moduleType.value.toUpperCase()}-MODULE`;

            let ulEl = document.createElement('ul');
            let liEl = document.createElement('li');
            liEl.className = 'flex';

            let h4El = document.createElement('h4');
            let splitDate = date.value.split('T');
            let dateOnly = splitDate[0].split('-');

            //add newDate syntaxis
            h4El.textContent = `${lectureName.value} - ${dateOnly[0]}/${dateOnly[1]}/${dateOnly[2]} - ${splitDate[1]}`; //split string check TODO

            let buttonEl = document.createElement('button');
            buttonEl.className = 'red';
            buttonEl.textContent = 'Del';
            buttonEl.addEventListener('click', deleteButtonClicked);
            return { liEl, h4El, buttonEl, ulEl, divEl, h3El, divTrainingParentElement };
        }

        function appendNewModule() {
            liEl.appendChild(h4El);
            liEl.appendChild(buttonEl);
            ulEl.appendChild(liEl);
            divEl.appendChild(h3El);
            divEl.appendChild(ulEl);
            divTrainingParentElement.appendChild(divEl);
        }

        function sortList(ul) {
            var ul = document.getElementById(ul);

            Array.from(ul.getElementsByTagName("LI"))
                .sort((a, b) => a.textContent.localeCompare(b.textContent))
                .forEach(li => ul.appendChild(li));
        }


        function sortInsideLiElements(allDates) {
            return allDates.sort((a, b) => {
                let first = a.textContent.split(' - ')[1].split('/').join('');
                let second = b.textContent.split(' - ')[1].split('/').join('');
                return first - second;
            });
        }
    }
    function deleteButtonClicked(event) {
        if (event.target.parentElement.previousSibling == null &&
            event.target.parentElement.nextSibling == null) {
            event.target.parentElement.parentElement.parentElement.remove();
            return;
        }
        let top;
        if (event.target.parentElement.nextSibling == null) {

            top = event.target.parentElement.previousSibling.localName;
        }
        else {
            top = event.target.parentElement.nextSibling.localName;

        }
        let result = top.localeCompare('li');
        if (result == 0) {
            event.target.parentElement.remove();
        }
    }
}