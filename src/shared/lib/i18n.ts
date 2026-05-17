// src/shared/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    ru: {
        translation: {
            common: {
                save: 'Сохранить',
                cancel: 'Отмена',
                delete: 'Удалить',
                loading: 'Загрузка...',
                more: 'Подробнее',
                back: 'Назад',
                send: 'Отправить',
                edit: 'Редактировать',
                search: 'Поиск...',
                not_found: 'Ничего не найдено',
                all: 'Все',
                roles: {
                    author: 'Автор',
                    editor: 'Редактор',
                    reviewer: 'Рецензент',
                    admin: 'Администратор'
                }
            },
            nav: {
                home: 'Главная',
                archive: 'Архив',
                about: 'О журнале',
                editorial: 'Ред. коллегия',
                ethics: 'Этика',
                submit: 'Подать статью',
                my_submissions: 'Мои рукописи',
                guidelines: 'Требования',
                editor_panel: 'Панель редактора',
                profile: 'Профиль',
                login: 'Вход в кабинет'
            },
            auth: {
                login_title: 'Вход в систему',
                register_title: 'Регистрация',
                email: 'Электронная почта',
                password: 'Пароль',
                first_name: 'Имя',
                last_name: 'Фамилия',
                middle_name: 'Отчество',
                organization: 'Организация',
                country: 'Страна',
                no_account: 'У вас еще нет профиля?',
                have_account: 'Уже есть аккаунт?',
                register_action: 'Зарегистрироваться',
                login_action: 'Войти в кабинет'
            },
            submission: {
                status: {
                    new: 'Новая',
                    under_review: 'На рецензии',
                    revision_required: 'Нужны правки',
                    accepted: 'Принята',
                    rejected: 'Отклонена',
                    published: 'Опубликована'
                },
                form: {
                    metadata: 'Метаданные',
                    title_ru: 'Заголовок (RU)',
                    title_en: 'Заголовок (EN)',
                    abstract_ru: 'Аннотация (RU)',
                    abstract_en: 'Аннотация (EN)',
                    keywords_ru: 'Ключевые слова (RU)',
                    keywords_en: 'Ключевые слова (EN)',
                    authors: 'Коллектив авторов',
                    file: 'Файл рукописи',
                    policy: 'Я подтверждаю, что статья ранее не публиковалась и оформлена согласно правилам.'
                }
            },
            journal: {
                current_issue: 'Текущий выпуск',
                archive_title: 'Архив номеров',
                issn: 'ISSN',
                doi: 'DOI',
                download_pdf: 'Скачать PDF',
                citation: 'Цитирование',
                copy: 'Копировать'
            }
        }
    },
    en: {
        translation: {
            common: {
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                loading: 'Loading...',
                more: 'Details',
                back: 'Back',
                send: 'Send',
                edit: 'Edit',
                search: 'Search...',
                not_found: 'Not found',
                all: 'All',
                roles: {
                    author: 'Author',
                    editor: 'Editor',
                    reviewer: 'Reviewer',
                    admin: 'Admin'
                }
            },
            nav: {
                home: 'Home',
                archive: 'Archive',
                about: 'About',
                editorial: 'Editorial Board',
                ethics: 'Ethics',
                submit: 'Submit Article',
                my_submissions: 'My Submissions',
                guidelines: 'Guidelines',
                editor_panel: 'Editor Panel',
                profile: 'Profile',
                login: 'Author Login'
            },
            auth: {
                login_title: 'Sign In',
                register_title: 'Create Account',
                email: 'Email address',
                password: 'Password',
                first_name: 'First Name',
                last_name: 'Last Name',
                middle_name: 'Middle Name',
                organization: 'Organization',
                country: 'Country',
                no_account: "Don't have an account?",
                have_account: 'Already have an account?',
                register_action: 'Register now',
                login_action: 'Sign In'
            },
            submission: {
                status: {
                    new: 'New',
                    under_review: 'Under Review',
                    revision_required: 'Revision Required',
                    accepted: 'Accepted',
                    rejected: 'Rejected',
                    published: 'Published'
                },
                form: {
                    metadata: 'Metadata',
                    title_ru: 'Title (RU)',
                    title_en: 'Title (EN)',
                    abstract_ru: 'Abstract (RU)',
                    abstract_en: 'Abstract (EN)',
                    keywords_ru: 'Keywords (RU)',
                    keywords_en: 'Keywords (EN)',
                    authors: 'Co-authors',
                    file: 'Manuscript File',
                    policy: 'I confirm that the article has not been published previously and complies with the rules.'
                }
            },
            journal: {
                current_issue: 'Current Issue',
                archive_title: 'Archive',
                issn: 'ISSN',
                doi: 'DOI',
                download_pdf: 'Download PDF',
                citation: 'How to cite',
                copy: 'Copy'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ru',
        debug: false,
        interpolation: {
            escapeValue: false, // react и так защищает от xss
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        }
    });

export default i18n;