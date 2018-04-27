var appModule = (function () {
    var passedCounter = 0;
    var failedCounter = 0;
    function addButtonListener() {
        document.querySelector(UIModule.UISelectors.addButton).addEventListener('click', function () {
            var data = UIModule.getFormData();
            var validationMessage = UIModule.validation(data);

            if (validationMessage != "OK") {
                UIModule.setError(validationMessage);
                return;
            }
            
            var student = dataModule.createStudent(data.name, data.surname);
            //var subjectX = dataModule.createSubject(data.subject);


            if (!dataModule.subjects.subjectJS.tookExam(student) && data.subject == 'js') {
                var exam = dataModule.createExam(dataModule.subjects.subjectJS, student, data.grade);
                dataModule.subjects.subjectJS.listOfStudents.push(student);
                console.log(dataModule.subjects.subjectJS.listOfStudents);

                updateStatistics(exam);
            }
            if (!dataModule.subjects.subjectWeb.tookExam(student) && data.subject == 'web') {
                var exam = dataModule.createExam(dataModule.subjects.subjectWeb, student, data.grade);
                dataModule.subjects.subjectWeb.listOfStudents.push(student);
                console.log(dataModule.subjects.subjectWeb.listOfStudents);

                updateStatistics(exam);
            }
            if (!dataModule.subjects.subjectSPA.tookExam(student) && data.subject == 'spa') {
                var exam = dataModule.createExam(dataModule.subjects.subjectSPA, student, data.grade);
                dataModule.subjects.subjectSPA.listOfStudents.push(student);
                console.log(dataModule.subjects.subjectSPA.listOfStudents);

                updateStatistics(exam);
            }
            
            function updateStatistics2(exam) {
                var passed = document.querySelector('.passed-ul');
                var failed = document.querySelector('.failed-ul');
                var passedCount = document.querySelector('.exam-passed-count');
                var failedCount = document.querySelector('.exam-failed-count');
                var failedPercent = document.querySelector('.exam-failed-percentage');

                var percentage = '100%';

                var studentLi = document.createElement('li');
                var studentText = document.createTextNode(exam.getExamInfo());
                studentLi.appendChild(studentText);

                if (exam.hasPassed()) {
                    passed.appendChild(studentLi);
                    passedCounter++;
                    passedCount.textContent = passedCounter;

                }
                if (!exam.hasPassed()) {
                    failed.appendChild(studentLi);
                    failedCounter++;
                    failedCount.textContent = failedCounter;
                }
                percentage = parseInt(100 * failedCounter / (passedCounter + failedCounter)) + '%';
                failedPercent.textContent = percentage;

            }
            function updateStatistics(exam) {
                var percentage = '100%';
                var passed = document.querySelector('.passed-list');
                var failed = document.querySelector('.failed-list');
                var passedCount = document.querySelector('.exam-passed-count');
                var failedCount = document.querySelector('.exam-failed-count');
                var failedPercent = document.querySelector('.exam-failed-percentage');


                
                if (exam.hasPassed()) {
                    passed.innerHTML += '<div class="item clearfix" id="failed-0"><div class="item-description">'+exam.student.getStudentData()+', '+exam.subject.name+'</div> <div class="right clearfix"><div class="item-value">'+exam.grade+'</div><div class="item-delete"> <button class="item-delete-btn">x</i></button></div></div></div>';
                    
                    passedCounter++;
                    passedCount.textContent = passedCounter;

                }
                if (!exam.hasPassed()) {
                    failed.innerHTML += '<div class="item clearfix" id="failed-0"><div class="item-description">'+exam.student.getStudentData()+', '+exam.subject.name+'</div> <div class="right clearfix"><div class="item-value">'+exam.grade+'</div><div class="item-delete"> <button class="item-delete-btn">x</i></button></div></div></div>';
                    failedCounter++;
                    failedCount.textContent = failedCounter;
                }
                percentage = parseInt(100 * failedCounter / (passedCounter + failedCounter)) + '%';
                failedPercent.textContent = percentage;

            }

        });



    }

    return {
        init: function () {
            console.log('God save us!');
            addButtonListener();
        }
    }
})(UIModule, dataModule);

appModule.init();