let tabCounter = 1;

document.getElementById('save').addEventListener('click', function() {
    const activeNote = document.querySelector('.note.active');
    const note = activeNote.value;
    if (note.trim() !== '') {
        const filename = prompt('Enter the filename:', 'Untitled.txt');
        if (filename) {
            const blob = new Blob([note], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('Note saved as ' + filename);
        }
    } else {
        alert('Note is empty!');
    }
});

document.getElementById('clear').addEventListener('click', function() {
    const activeNote = document.querySelector('.note.active');
    activeNote.value = '';
    alert('Note cleared!');
});

document.getElementById('open').addEventListener('click', function() {
    const savedNote = localStorage.getItem(`note-${tabCounter}`);
    if (savedNote) {
        const activeNote = document.querySelector('.note.active');
        activeNote.value = savedNote;
        alert('Note opened!');
    } else {
        alert('No saved note found!');
    }
});

document.getElementById('new').addEventListener('click', function() {
    createNewTab();
});

document.getElementById('copy').addEventListener('click', function() {
    const activeNote = document.querySelector('.note.active');
    activeNote.select();
    document.execCommand('copy');
    alert('Text copied!');
});

document.getElementById('paste').addEventListener('click', function() {
    const activeNote = document.querySelector('.note.active');
    activeNote.focus();
    document.execCommand('paste');
});

document.getElementById('delete').addEventListener('click', function() {
    const activeNote = document.querySelector('.note.active');
    activeNote.value = '';
    alert('Text deleted!');
});

document.getElementById('zoom-in').addEventListener('click', function() {
    const activeNote = document.querySelector('.note.active');
    let fontSize = window.getComputedStyle(activeNote, null).getPropertyValue('font-size');
    fontSize = parseFloat(fontSize) + 2;
    activeNote.style.fontSize = fontSize + 'px';
});

document.getElementById('zoom-out').addEventListener('click', function() {
    const activeNote = document.querySelector('.note.active');
    let fontSize = window.getComputedStyle(activeNote, null).getPropertyValue('font-size');
    fontSize = parseFloat(fontSize) - 2;
    activeNote.style.fontSize = fontSize + 'px';
});

document.getElementById('fullscreen').addEventListener('click', function() {
    const notepad = document.querySelector('.notepad');
    if (notepad.requestFullscreen) {
        notepad.requestFullscreen();
    } else if (notepad.mozRequestFullScreen) {
        notepad.mozRequestFullScreen();
    } else if (notepad.webkitRequestFullscreen) {
        notepad.webkitRequestFullscreen();
    } else if (notepad.msRequestFullscreen) {
        notepad.msRequestFullscreen();
    }
});

document.querySelector('.tabs').addEventListener('click', function(event) {
    if (event.target.classList.contains('tab')) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');

        const notes = document.querySelectorAll('.note');
        notes.forEach(note => note.classList.remove('active'));
        document.getElementById(`note-${event.target.dataset.tab}`).classList.add('active');

        const charCount = document.querySelector('.note.active').value.length;
        document.getElementById('char-count').textContent = `${charCount} characters`;
    }
});

function createNewTab() {
    const tabs = document.querySelector('.tabs');
    const content = document.querySelector('.content');

    const newTab = document.createElement('button');
    newTab.classList.add('tab');
    newTab.textContent = `Untitled ${tabCounter}`;
    newTab.dataset.tab = tabCounter;
    tabs.appendChild(newTab);

    const newNote = document.createElement('textarea');
    newNote.classList.add('note');
    newNote.id = `note-${tabCounter}`;
    newNote.placeholder = 'Start typing your note here...';
    content.appendChild(newNote);

    newTab.addEventListener('click', function() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        newTab.classList.add('active');

        const notes = document.querySelectorAll('.note');
        notes.forEach(note => note.classList.remove('active'));
        newNote.classList.add('active');

        const charCount = document.querySelector('.note.active').value.length;
        document.getElementById('char-count').textContent = `${charCount} characters`;
    });

    newNote.addEventListener('input', function() {
        const charCount = document.querySelector('.note.active').value.length;
        document.getElementById('char-count').textContent = `${charCount} characters`;
    });

    tabCounter++;
}

window.addEventListener('load', function() {
    const savedNote = localStorage.getItem('note-0');
    if (savedNote) {
        document.getElementById('note-0').value = savedNote;
    }
    const charCount = document.getElementById('note-0').value.length;
    document.getElementById('char-count').textContent = `${charCount} characters`;
});
