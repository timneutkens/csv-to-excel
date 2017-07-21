Dropzone.options.fileDropzone = {
    dictDefaultMessage: 'Drop file here to convert',
    init: function() {
        this.on('success', function(file, res) {
            var blob = new Blob([res], {type: "text/csv;charset=utf-8"});
            saveAs(blob, file.name.replace('.csv', '-converted.csv'));
        });

        this.on('complete', function(file) {
            this.removeFile(file)
        })
    }
}