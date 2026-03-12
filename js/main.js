// main.js - Lógica del checklist interactivo para DevLaunch Kit

document.addEventListener('DOMContentLoaded', function() {
    // Datos del checklist organizados por fases
    const checklistData = [
        {
            id: 'phase1',
            title: 'Fase 1: Preparación y Planificación',
            tasks: [
                { id: 'task1-1', text: 'Definir objetivos del proyecto y KPIs', completed: false },
                { id: 'task1-2', text: 'Investigar audiencia objetivo y competencia', completed: false },
                { id: 'task1-3', text: 'Crear moodboard con referencias visuales', completed: false },
                { id: 'task1-4', text: 'Definir paleta de colores y tipografía', completed: false },
                { id: 'task1-5', text: 'Crear wireframes en papel o digital', completed: false },
                { id: 'task1-6', text: 'Planificar la estructura de archivos del proyecto', completed: false },
                { id: 'task1-7', text: 'Seleccionar tecnologías (HTML, CSS, JS, frameworks)', completed: false }
            ]
        },
        {
            id: 'phase2',
            title: 'Fase 2: Desarrollo y Maquetación',
            tasks: [
                { id: 'task2-1', text: 'Configurar entorno de desarrollo (VS Code, Git)', completed: false },
                { id: 'task2-2', text: 'Crear estructura HTML semántica', completed: false },
                { id: 'task2-3', text: 'Implementar estilos base con CSS/Tailwind', completed: false },
                { id: 'task2-4', text: 'Desarrollar sección Hero principal', completed: false },
                { id: 'task2-5', text: 'Crear sección de características/beneficios', completed: false },
                { id: 'task2-6', text: 'Implementar sección de testimonios o casos de éxito', completed: false },
                { id: 'task2-7', text: 'Desarrollar formulario de contacto o CTA', completed: false },
                { id: 'task2-8', text: 'Asegurar diseño responsive (mobile-first)', completed: false }
            ]
        },
        {
            id: 'phase3',
            title: 'Fase 3: Interactividad y Funcionalidades',
            tasks: [
                { id: 'task3-1', text: 'Agregar interactividad básica con JavaScript', completed: false },
                { id: 'task3-2', text: 'Implementar validación de formularios', completed: false },
                { id: 'task3-3', text: 'Agregar efectos de hover y transiciones', completed: false },
                { id: 'task3-4', text: 'Implementar navegación suave (smooth scrolling)', completed: false },
                { id: 'task3-5', text: 'Agregar funcionalidad de menú móvil (si es necesario)', completed: false },
                { id: 'task3-6', text: 'Integrar APIs externas (si aplica)', completed: false },
                { id: 'task3-7', text: 'Optimizar rendimiento (lazy loading, etc.)', completed: false }
            ]
        },
        {
            id: 'phase4',
            title: 'Fase 4: Revisión y Publicación',
            tasks: [
                { id: 'task4-1', text: 'Testing en diferentes navegadores (Chrome, Firefox, Safari)', completed: false },
                { id: 'task4-2', text: 'Testing en dispositivos móviles y tablets', completed: false },
                { id: 'task4-3', text: 'Verificar accesibilidad (contraste, ARIA labels)', completed: false },
                { id: 'task4-4', text: 'Optimizar SEO (meta tags, headings, alt texts)', completed: false },
                { id: 'task4-5', text: 'Comprimir imágenes y recursos', completed: false },
                { id: 'task4-6', text: 'Revisar y optimizar el código', completed: false },
                { id: 'task4-7', text: 'Configurar dominio y hosting (GitHub Pages, Netlify, etc.)', completed: false },
                { id: 'task4-8', text: 'Implementar analytics (Google Analytics, etc.)', completed: false }
            ]
        }
    ];

    // Cargar progreso desde localStorage
    function loadProgress() {
        const savedProgress = localStorage.getItem('devLaunchChecklistProgress');
        if (savedProgress) {
            const parsedProgress = JSON.parse(savedProgress);
            checklistData.forEach(phase => {
                phase.tasks.forEach(task => {
                    if (parsedProgress[task.id]) {
                        task.completed = parsedProgress[task.id];
                    }
                });
            });
        }
    }

    // Guardar progreso en localStorage
    function saveProgress() {
        const progress = {};
        checklistData.forEach(phase => {
            phase.tasks.forEach(task => {
                progress[task.id] = task.completed;
            });
        });
        localStorage.setItem('devLaunchChecklistProgress', JSON.stringify(progress));
        updateProgressBar();
    }

    // Actualizar barra de progreso
    function updateProgressBar() {
        let totalTasks = 0;
        let completedTasks = 0;

        checklistData.forEach(phase => {
            totalTasks += phase.tasks.length;
            phase.tasks.forEach(task => {
                if (task.completed) completedTasks++;
            });
        });

        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        const progressBar = document.getElementById('progress-bar');
        const progressPercentage = document.getElementById('progress-percentage');
        
        if (progressBar && progressPercentage) {
            progressBar.style.width = `${percentage}%`;
            progressPercentage.textContent = `${percentage}%`;
            
            // Cambiar color según el progreso
            if (percentage < 30) {
                progressBar.className = 'bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full transition-all duration-500';
            } else if (percentage < 70) {
                progressBar.className = 'bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-500';
            } else {
                progressBar.className = 'bg-gradient-to-r from-green-500 to-teal-500 h-4 rounded-full transition-all duration-500';
            }
        }
    }

    // Crear el HTML del checklist
    function renderChecklist() {
        const container = document.getElementById('checklist-container');
        if (!container) return;

        let checklistHTML = '';

        checklistData.forEach(phase => {
            checklistHTML += `
                <div class="phase-group mb-10 last:mb-0">
                    <h3 class="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">${phase.title}</h3>
                    <div class="space-y-4">
            `;

            phase.tasks.forEach(task => {
                checklistHTML += `
                    <div class="task-item flex items-start p-4 rounded-lg border ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:bg-gray-50'} transition-colors">
                        <div class="flex items-center h-6 mr-4">
                            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} 
                                   class="task-checkbox w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer">
                        </div>
                        <label for="${task.id}" class="flex-grow cursor-pointer select-none">
                            <span class="text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</span>
                            ${task.completed ? 
                                `<span class="inline-block ml-3 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completado</span>` : 
                                `<span class="inline-block ml-3 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Pendiente</span>`
                            }
                        </label>
                    </div>
                `;
            });

            checklistHTML += `
                    </div>
                </div>
            `;
        });

        // Botones de control
        checklistHTML += `
            <div class="flex flex-wrap justify-between items-center mt-10 pt-8 border-t border-gray-200">
                <div class="mb-4 sm:mb-0">
                    <button id="reset-btn" class="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition">
                        <i class="fas fa-rotate-left mr-2"></i>Reiniciar Checklist
                    </button>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-600 mb-2">
                        <i class="fas fa-info-circle mr-1"></i>
                        Tu progreso se guarda automáticamente
                    </div>
                    <button id="export-btn" class="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition">
                        <i class="fas fa-download mr-2"></i>Exportar Progreso
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = checklistHTML;

        // Añadir event listeners a los checkboxes
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskId = this.id;
                let taskFound = false;
                
                // Buscar y actualizar la tarea
                checklistData.forEach(phase => {
                    phase.tasks.forEach(task => {
                        if (task.id === taskId) {
                            task.completed = this.checked;
                            taskFound = true;
                            
                            // Actualizar visualmente la tarea
                            const taskItem = this.closest('.task-item');
                            const taskLabel = taskItem.querySelector('label span:first-child');
                            const statusBadge = taskItem.querySelector('label span:last-child');
                            
                            if (this.checked) {
                                taskItem.className = 'task-item flex items-start p-4 rounded-lg bg-green-50 border border-green-200 transition-colors';
                                taskLabel.className = 'text-gray-800 line-through text-gray-500';
                                statusBadge.innerHTML = '<span class="inline-block ml-3 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completado</span>';
                            } else {
                                taskItem.className = 'task-item flex items-start p-4 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors';
                                taskLabel.className = 'text-gray-800';
                                statusBadge.innerHTML = '<span class="inline-block ml-3 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Pendiente</span>';
                            }
                        }
                    });
                });
                
                if (taskFound) {
                    saveProgress();
                }
            });
        });

        // Añadir event listener al botón de reiniciar
        document.getElementById('reset-btn').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres reiniciar todo el checklist? Se perderá tu progreso actual.')) {
                localStorage.removeItem('devLaunchChecklistProgress');
                location.reload();
            }
        });

        // Añadir event listener al botón de exportar
        document.getElementById('export-btn').addEventListener('click', function() {
            exportProgress();
        });
    }

    // Exportar progreso como texto
    function exportProgress() {
        let exportText = '🚀 DevLaunch Kit - Progreso del Checklist\n';
        exportText += '========================================\n\n';
        
        let totalTasks = 0;
        let completedTasks = 0;

        checklistData.forEach(phase => {
            exportText += `${phase.title}\n`;
            exportText += `${'='.repeat(phase.title.length)}\n`;
            
            phase.tasks.forEach(task => {
                totalTasks++;
                if (task.completed) completedTasks++;
                
                exportText += `[${task.completed ? '✓' : ' '}] ${task.text}\n`;
            });
            
            exportText += '\n';
        });
        
        exportText += `\n📊 RESUMEN: ${completedTasks}/${totalTasks} tareas completadas (${Math.round((completedTasks / totalTasks) * 100)}%)\n`;
        exportText += `📅 Fecha de exportación: ${new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}\n`;
        
        // Crear un blob y descargar
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `devlaunch-checklist-progress-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Mostrar notificación
        showNotification('Progreso exportado correctamente', 'success');
    }

    // Mostrar notificación
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-y-full opacity-0 transition-all duration-300 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`;
        notification.textContent = message;
        notification.id = 'temp-notification';
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.classList.remove('translate-y-full', 'opacity-0');
            notification.classList.add('translate-y-0', 'opacity-100');
        }, 10);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('translate-y-0', 'opacity-100');
            notification.classList.add('translate-y-full', 'opacity-0');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializar la aplicación
    function init() {
        loadProgress();
        renderChecklist();
        updateProgressBar();
        
        // Mostrar mensaje de bienvenida si es la primera vez
        if (!localStorage.getItem('devLaunchChecklistFirstVisit')) {
            setTimeout(() => {
                showNotification('¡Bienvenido al DevLaunch Kit! Tu progreso se guarda automáticamente.', 'success');
                localStorage.setItem('devLaunchChecklistFirstVisit', 'true');
            }, 1000);
        }
    }

    // Iniciar la aplicación cuando el DOM esté listo
    init();
});