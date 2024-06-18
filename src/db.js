import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
    templates: '++id, site' // Primary key and indexed props
});