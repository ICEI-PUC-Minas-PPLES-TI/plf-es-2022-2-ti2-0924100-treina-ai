const sql = require("mssql");
class Config {
    public USER = 'lucas';
    public PASSWORD = 'trabalho#123';
    public SERVER = 'treina-ai-tis.database.windows.net';
    public DATABASE = 'Tutoriais';

    public objectConfig() : object{
        return {
            user: this.USER,
            password: this.PASSWORD,
            server: this.SERVER,
            database: this.DATABASE,
        };
    }

    public async database() : Promise<any>  {
        let conn = await sql.connect(this.objectConfig());
        let request = await conn.request();
        
        return request;
    }
}

export default new Config();